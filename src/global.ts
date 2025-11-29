const links: Array<{
  key: string,
  section: 'primary' | 'secondary',
  icon: string | null,
}> = [
  { key: 'home', icon: 'mdi-home', section: 'primary' },
  { key: 'about', icon: 'mdi-information-outline', section: 'secondary' },
  { key: 'portfolio', icon: 'mdi-tools', section: 'primary' },
  { key: 'testimonials', icon: 'mdi-comment-check-outline', section: 'primary' },
  { key: 'faq', icon: 'mdi-frequently-asked-questions', section: 'secondary' },
  { key: 'contact', icon: 'mdi-email-outline', section: 'primary' },
]

const availableLanguages = [
  { text: 'English', value: 'en-US', },
  { text: 'Español', value: 'es-MX', },
]

export {
  links,
  availableLanguages,
}
