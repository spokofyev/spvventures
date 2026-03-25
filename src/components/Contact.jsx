import ContactForm from './ContactForm'

export default function Contact() {
  return (
    <section id="contact" className="bg-white py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-black mb-3">
          Get in touch
        </h2>
        <p className="text-black/50 text-lg mb-12">
          Tell us about your company. We respond to all serious enquiries within 48 hours.
        </p>
        <ContactForm />
      </div>
    </section>
  )
}
