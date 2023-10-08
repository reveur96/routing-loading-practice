import { useRouteLoaderData, json, redirect } from "react-router-dom"

import EventItem from "../components/EventItem"

const EventDetailPage = () =>
{
  const data = useRouteLoaderData('event-detail')

  return (
    <EventItem event={data.event}/>
  )
}

export default EventDetailPage

export const loader = async ({request, params}) =>
{
  const eventId = params.eventId

  const response = await fetch(`http://localhost:8080/events/${eventId}`)
  
  if (!response.ok)
  {
    throw json({message:"Could not fetch details for selected event."}, {status : 500})
  } else
  {
    return response
  }
}

export const action = async ({request, params}) =>
{
  const eventId = params.eventId
  const response = await fetch(`http://localhost:8080/events/${ eventId }`, {
    method: request.method,
  })
   
  if (!response.ok)
  {
    throw json({message:"Could not delete event."}, {status : 500})
  }
  return redirect('/events')
}