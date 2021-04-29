export default async function handleSubmit (e) {
  e.preventDefault()
  const form = document.getElementById('subscribe')
  const formData = new FormData(form)

  const data = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString()
  })
  .then(() => {
    alert("Thank you for subscribing!")
    form.reset()
  })
  .catch((e) => {
    alert("Sorry, there was a problem submitting the form.")
    console.error(e)
  })

  return data
}