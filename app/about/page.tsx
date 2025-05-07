import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">About BookHaven</h1>
          <p className="mt-4 text-lg text-muted-foreground">Your trusted source for books since 2010</p>
        </div>

        <div className="relative w-full h-64 md:h-96 mb-12 rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
            alt="BookHaven Library"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-4">
            BookHaven was founded in 2010 with a simple mission: to connect readers with the books they love. What
            started as a small corner bookshop has grown into a beloved community hub for book lovers of all ages.
          </p>
          <p className="text-muted-foreground mb-4">
            Our founder, Suwahas Prabashwara, a lifelong bibliophile, envisioned a space where people could discover new
            worlds, ideas, and perspectives through the power of reading. Today, that vision continues to guide
            everything we do.
          </p>
          <p className="text-muted-foreground">
            We believe that books have the power to transform lives, spark imagination, and foster empathy. That's why
            we're committed to curating a diverse and inclusive collection that represents a wide range of voices and
            experiences.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-muted-foreground">
                  We're more than just a bookstore—we're a gathering place for our community. We host regular events,
                  book clubs, and author signings to bring readers together.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Curation</h3>
                <p className="text-muted-foreground">
                  We carefully select each title in our collection, focusing on quality, diversity, and relevance. Our
                  staff are passionate readers who love to share recommendations.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
                <p className="text-muted-foreground">
                  We're committed to environmentally responsible practices, from our eco-friendly packaging to our used
                  book exchange program.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Suwahas Prabashwara",
                role: "Founder & Developer",
                image: "https://randomuser.me/api/portraits/men/32.jpg",
              },
              {
                name: "Michael Johnson",
                role: "Head of Curation",
                image: "https://randomuser.me/api/portraits/men/32.jpg",
              },
              {
                name: "Sarah Williams",
                role: "Community Manager",
                image: "https://randomuser.me/api/portraits/women/68.jpg",
              },
              {
                name: "David Chen",
                role: "Operations Manager",
                image: "https://randomuser.me/api/portraits/men/75.jpg",
              },
              {
                name: "Emily Rodriguez",
                role: "Events Coordinator",
                image: "https://randomuser.me/api/portraits/women/89.jpg",
              },
              {
                name: "Robert Kim",
                role: "Customer Experience",
                image: "https://randomuser.me/api/portraits/men/22.jpg",
              },
            ].map((member) => (
              <div key={member.name} className="flex items-center space-x-4">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Visit Us</h3>
                <p className="text-sm text-muted-foreground">
                  No.164 Kingscourt
                  <br />
                  Matara
                  <br />
                  Sri Lanka
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Email Us</h3>
                <p className="text-sm text-muted-foreground">suwahasprabashwara@gmail.com</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Call Us</h3>
                <p className="text-sm text-muted-foreground">
                  0769977239
                  <br />
                  Mon-Sat: 9am-6pm
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  )
}
