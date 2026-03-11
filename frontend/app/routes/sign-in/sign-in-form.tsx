import {Button, Label, TextInput} from "flowbite-react";
import {SignUpFormModal} from "~/routes/sign-in/sign-up-form-modal/sign-up-form-modal";


export function SignInForm() {
	return(
		<>
			<form className="flex  flex-col mx-auto gap-4">
				<h1 className="text-3xl font-bold">Welcome back.</h1>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="email1" > Your email</Label>
					</div>
					<TextInput
						autoComplete='email'

						id="email1"
						type="email"
						name="profileEmail"
					/>

				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="password1" >
							Your password
						</Label>
					</div>
					<TextInput
						autoComplete='current-password'

						name="profilePassword"
						id="password1"
						type="password"
					/>
				</div>
				<SignUpFormModal/>
				<div className="flex">
					<Button className={'mr-1'} type="submit">Submit</Button>
					<Button className='ml-1' color={'red'} type={'reset'}>Reset</Button>

				</div>
			</form>
		</>
	)
}