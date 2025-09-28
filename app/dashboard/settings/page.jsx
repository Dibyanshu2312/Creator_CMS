"use client"
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import React from 'react'

const settingsPage = () => {
const data = useQuery(api.users.getCurrentUser);
  return (
    <div>settingsPage</div>
  )
}

export default settingsPage