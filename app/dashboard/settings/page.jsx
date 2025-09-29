"use client"
import { useAuthenticatedUser } from '@/Hooks/use-authenticated-user'
import { AuthTest } from '@/components/AuthTest'
import { getCurrentUser } from '@/convex/users'
import React from 'react'

const settingsPage = () => {
  const data = getCurrentUser();
  console.log(data);
  return (
    <div>settings</div>
      
  )
}

export default settingsPage