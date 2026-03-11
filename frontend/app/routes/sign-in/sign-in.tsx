import type { Route } from "./+types/sign-in";
import {SignInForm} from "~/routes/sign-in/sign-in-form";
	export function meta({}: Route.MetaArgs) {
	return [
		{ title: "rethread" },
		{ name: "description", content: "please sign in or sign up" },
	];
	}

	export default function SignIn() {

		return(
			<>
				<section className="flex flex-auto gap-5 h-dvh items-center grow">

					<div className=" min-w-80 border border-black dark:border-amber-50 md:grid grid-rows-1 place-items-stretch self-center sm:place-items-stretch px-2 mx-auto  xl:gap-0 py-16  grid-cols-1 md:grid-cols-10">

						<div className=" h-fit hidden md:block mx-6  md:col-span-4">
							<img src="/login-hero.png" width={259} height={387}  alt="person holding phone staring at twitter login page Photo by Akshar Dave🌻 on Unsplash"/>
						</div>

						<div className=" md:h-fit p-5  md:p-2 md:ms-4  md:w-2/3  mr-auto md:col-span-6">
							<SignInForm />
						</div>


					</div>
				</section>

			</>

		)

	}