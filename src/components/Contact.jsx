import ContactForm from './ContactForm'

export default function Contact() {
  return (
    <section id="contact" className="px-8 md:px-16 lg:px-24 py-32 border-t border-black/10">
      <p className="text-xs uppercase tracking-widest text-black/30 mb-16">
        Contact ————————————————————
      </p>
      <div className="max-w-lg">
        <h2 className="text-4xl sm:text-5xl font-normal tracking-tight text-black mb-8 leading-tight">
          Get in touch
        </h2>
        <p className="text-base text-black/50 mb-16 leading-relaxed">
          Tell us about your company or mandate. We respond to all serious enquiries within 48 hours.
        </p>
        <ContactForm />
      </div>
    </section>
  )
}
