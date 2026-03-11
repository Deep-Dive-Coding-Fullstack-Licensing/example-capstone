import type { Route } from "./+types/sign-in";
import {postSignIn, SignInSchema} from "~/utils/models/sign-in.model";
import {Form, redirect, useActionData} from "react-router";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button, Label, TextInput} from "flowbite-react";
import {FieldError} from "~/components/field-error";
import {SignUpFormModal} from "~/routes/sign-in/sign-up-form-modal/sign-up-form-modal";
import {type SignIn} from "~/utils/models/sign-in.model";
import {jwtDecode} from "jwt-decode";
import {ProfileSchema} from "~/utils/models/profile";
import {commitSession, getSession} from "~/utils/sessions.server";

/**
 * Meta function for the sign-in page
 * Sets the page title and description for SEO
 */
export function meta({}: Route.MetaArgs) {
	return [
		{ title: "rethread" },
		{ name: "description", content: "please sign in or sign up" },
	];
}

// export async function loader({request}: Route.LoaderArgs) {
// 	// Get existing session from cookie
// 	const session = await getSession(
// 		request.headers.get('Cookie')
// 	)
//
// 	// Check if user is already authenticated
// 	if (session.has('profile')) {
// 		return redirect('/')
// 	}
//
// }

/**
 * Server action for handling sign-in form submissions
 * Validates form data, authenticates user, and manages session
 * @param request - The incoming HTTP request containing form data
 * @returns Action response with success/error status
 */
export async function action({request} : Route.ActionArgs) {
	try {
		// Get existing session from cookie
		const session = await getSession(
			request.headers.get('Cookie')
		)

		// Extract form data from request
		const formData = await request.formData()

		const signInObject = Object.fromEntries(formData)

		// Validate form data using zod schema
		const validatedData = SignInSchema.parse(signInObject)

		// Make API call to authenticate user
		const {result, headers}=	await postSignIn(validatedData)

		// Extract authorization token from response headers
		const authorization = headers.get('authorization')

		// Extract session cookie from response headers
		const expressSessionCookie = headers.get('Set-Cookie');
		console.log(result, authorization)

		// Check if authentication was successful
		if(result.status !== 200 || !authorization )  {
			return { success: false, error: result.message,  status: 400}
		}

		// Decode JWT token to extract user profile
		const parsedJwtToken = jwtDecode(authorization) as any

		// Validate profile data from JWT
		const validationResult = ProfileSchema.safeParse(parsedJwtToken.auth)

		// Handle invalid profile data
		if ( !validationResult.success ) {
			session.flash('error', 'profile is malformed')
			return { success: false, error: 'internal server error try again later', status: 400 }
		}

		session.set('authorization', authorization)
		session.set('profile', validationResult.data)

		const responseHeaders = new Headers()
		responseHeaders.append('Set-Cookie', await commitSession(session))
		if (expressSessionCookie) {
			responseHeaders.append('Set-Cookie', expressSessionCookie)
		}

		return redirect('/', {headers: responseHeaders})

	} catch (error) {
		// Log and return error response
		console.error('Sign-in action error:', error)

		return {success: false, error: error instanceof Error ? error.message : 'Unknown error', status: 500}
	}
}

/**
 * Sign-in page component
 * Provides user authentication form with validation
 * @returns JSX element containing the sign-in form
 */
export default function SignIn() {
		// Get action data from server response
		const actionData = useActionData<{success: boolean; validationErrors?: any; error?: string}>()

	// Since the sign-in schema has no nullable fields we can directly use it as validation for the form
	const formSchema = SignInSchema

		// Set up form with react-hook-form and zod validation
		const {
			register,
			formState: { errors, isSubmitting },
			reset
		} = useForm<SignIn>({
			resolver: zodResolver(formSchema),
			mode: "onBlur"
		})

		return(
			<>
				{/* Main sign-in page layout */}
				<section className="flex flex-auto gap-5 h-dvh items-center grow">

					{/* Form container with responsive grid layout */}
					<div className=" min-w-80 border border-black dark:border-amber-50 md:grid grid-rows-1 place-items-stretch self-center sm:place-items-stretch px-2 mx-auto  xl:gap-0 py-16  grid-cols-1 md:grid-cols-10">

						{/* Hero image - hidden on mobile */}
						<div className=" h-fit hidden md:block mx-6  md:col-span-4">
							<img src="/login-hero.png" width={259} height={387}  alt="person holding phone staring at twitter login page Photo by Akshar Dave🌻 on Unsplash"/>
						</div>

						{/* Sign-in form section */}
						<div className=" w-75 md:h-fit p-5  md:p-2 md:ms-4  md:w-2/3  mr-auto md:col-span-6">
							<Form action={'/sign-in'} className="flex  flex-col mx-auto gap-4"  method="post" noValidate>
								<h1 className="text-3xl font-bold">Welcome back.</h1>

								{/* Display server error messages */}
								{actionData?.error && (
									<div className="text-red-500 text-sm mb-4">
										{actionData.error}
									</div>
								)}
								{/* Email input field */}
								<div>
									<div className="mb-2 block">
										<Label htmlFor="email1" > Your email</Label>
									</div>
									<TextInput
										{...register("profileEmail")}
										autoComplete='email'
										id="email1"
										type="email"
										color={errors.profileEmail  ? 'failure' : undefined}
									/>
									<FieldError error={errors.profileEmail?.message} />
								</div>

								{/* Password input field */}
								<div className={"max-w-full"}>
									<div className="mb-2 block">
										<Label htmlFor="password1" >
											Your password
										</Label>
									</div>
									<TextInput
										{...register("profilePassword")}
										autoComplete='current-password'
										id="password1"
										type="password"
										color={errors.profilePassword ? 'failure' : undefined}
									/>
									<FieldError error={errors.profilePassword?.message} />
								</div>

								{/* Sign-up modal component */}
								<SignUpFormModal/>

								{/* Form action buttons */}
								<div className="flex">
									<Button className={'mr-1'} type="submit" disabled={isSubmitting}>Submit</Button>
									<Button className='ml-1' color={'red'} type={'button'} onClick={() => reset()}>Reset</Button>
								</div>
							</Form>
						</div>
					</div>
				</section>

			</>

		)

	}