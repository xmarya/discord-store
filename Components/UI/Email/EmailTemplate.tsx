
type Props = {
    message:string,
    firstName?:string
}

export default function EmailTemplate({firstName, message}:Props) {
    return (
        <div>
    <h1>Welcome, {message}!</h1>
  </div>
    )
}

