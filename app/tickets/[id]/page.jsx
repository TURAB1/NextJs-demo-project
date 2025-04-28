import { notFound } from "next/navigation"
import { BASE_API_URL } from "../../utils/constants"

export const dynamicParams = true // default val = true

export async function generateStaticParams() {
  const res = await fetch(`${BASE_API_URL}/tickets`)

  const tickets = await res.json()
 
  return tickets.map((ticket) => ({
    id: ticket.id
  }))
}

async function getTicket(id) {
  const res = await fetch(`${BASE_API_URL}/tickets/${id}`, {
    next: {
      revalidate: 60
    }
  })

  if (!res.ok) {
    notFound()
  }

  return res.json()
}


export default async function TicketDetails({ params }) {
  // const id = params.id
  const ticket = await getTicket(params.id)

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.type}`}>
          {ticket.type} type
        </div>
      </div>
    </main>
  )
}