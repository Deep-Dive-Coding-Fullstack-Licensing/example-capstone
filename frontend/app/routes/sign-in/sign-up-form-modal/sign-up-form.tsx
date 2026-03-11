
import {Button, Label, TextInput} from "flowbite-react";

export function SignUpForm() {
	return(
		<>
			<form className="flex min-h-auto gap-4 min-w-full flex-col grow">
				<div>
					<div className="mb-2 block">
						<Label htmlFor="email1"> email </Label>
					</div>
					<TextInput

						autoComplete='email'
						id="email1"
						name={'profileEmail'}
						type="email"

					/>

				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="profileName"> username</Label>
					</div>
					<TextInput

						autoComplete='username'
						id="profileName"
						name={'profileName'}
						type="text"

					/>

				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="profilePassword"> password</Label>
					</div>
					<TextInput
						autoComplete={'new-password'}
						name='profilePassword'
						id="profilePassword"
						type="password"

					/>

				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="profilePasswordConfirm">confirm password </Label>
					</div>
					<TextInput

						id="profilePasswordConfirm"
						name="profilePasswordConfirm"
						autoComplete={'new-password confirm'} type="password"
					/>
				</div>
				<div className={'flex gap-4'}>
				<Button type="submit">Submit</Button>
				<Button color={'red'} type="reset">Reset</Button>
				</div>
			</form>
		</>)
}