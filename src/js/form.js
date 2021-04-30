export default async function handleSubmit (e) {
  e.preventDefault()
  const form = document.getElementById('subscribe')
  const data = new FormData(form)
  data.append('form-name', 'subscribe');
  await fetch("/", {
    method: "POST",
    body: data
  })
  .then(() => {
    form.innerHTML = `<p class="text-2xl font-bold text-white">Thank You for subscribing!</p>`
    form.reset()
  })
  .catch((e) => {
    alert(`Error: ${error}`)
    console.error(e)
  })
}