export function validateCheckout(form) {
  const e = {}
  if (form.name.trim().length < 2) e.name = 'Enter your full name'
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Enter a valid email'
  if (!/^\+?[0-9 ]{8,15}$/.test(form.phone.trim())) e.phone = 'Enter a valid phone number'
  if (form.address.trim().length < 6) e.address = 'Enter your street address'
  if (!form.city) e.city = 'Choose a city'
  return e
}
