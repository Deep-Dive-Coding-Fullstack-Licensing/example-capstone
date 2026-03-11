import {HelperText} from "flowbite-react";


interface FieldErrorProps {
	error?: string;
	className?: string;
}



export function FieldError({ error, className = "text-red-500 text-sm mt-1" }: FieldErrorProps) {
	const errorMessage = error;

	if (!errorMessage) {
		return <></>
	}

	return (
		<HelperText className={className}>
				{errorMessage}
		</HelperText>
	)
}
