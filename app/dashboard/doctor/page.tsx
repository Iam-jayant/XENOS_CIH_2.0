"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { DoctorDashboard } from "@/components/dashboard/doctor-dashboard"
import { useAuth } from "@/contexts/auth-context"

export default function DoctorDashboardPage() {  const { user, profile, loading } = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/login")
      } else if (profile?.role !== "doctor") {
        router.replace("/")
      } else if (!profile.profile_completed) {
        router.replace("/onboarding")
      }
    }
  }, [user, profile, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Loading...</h2>
          <p className="text-gray-600">Please wait while we verify your credentials.</p>
        </div>
      </div>
    )
  }

  if (!user || profile?.role !== "doctor" || !profile.profile_completed) {
    return null // Will redirect in useEffect
  }

  return <DoctorDashboard user={user} />
}
