"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BlogCreationForm } from "@/components/BlogCreationForm"
import { BlogUpdateForm } from "@/components/BlogUpdateForm"
import { ProductUploadForm } from "@/components/ProductUploadForm"
import { GalleryUploadForm } from "@/components/GalleryUploadForm"
import { BlogVisibilityManager } from "@/components/BlogVisibilityManager"
import { ContactSubmissionsManager } from "@/components/ContactSubmissionsManager"
import { TestimonialUploadForm } from "@/components/TestimonialUploadForm"
import { AppointmentManager } from "@/components/AppointmentManager"
import LogoutButton from "@/components/auth/logout-button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">Admin Dashboard</h1>
          <p className="text-primary-700 mt-1">Manage your website content</p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="bg-primary-800 hover:bg-primary-900 text-primary-50">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to logout? You will need to log back in to access the admin dashboard.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <LogoutButton>Logout</LogoutButton>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Content Management</CardTitle>
          <CardDescription>Select a section to manage</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="blog-create" className="w-full ">
            <TabsList className="grid w-full grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-8 mb-10 bg-primary-100 text-primary-900">
              <TabsTrigger value="blog-create">Create Blog</TabsTrigger>
              <TabsTrigger value="blog-manage">Manage Blogs</TabsTrigger>
              <TabsTrigger value="blog-visibility">Blog Visibility</TabsTrigger>
              <TabsTrigger value="shop">Shop Management</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
              <TabsTrigger value="contact">Contact Submissions</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
            </TabsList>
            <div className="mt-6">
              <TabsContent value="blog-create" >
                <BlogCreationForm />
              </TabsContent>
              <TabsContent value="blog-manage">
                <BlogUpdateForm />
              </TabsContent>
              <TabsContent value="blog-visibility">
                <BlogVisibilityManager />
              </TabsContent>
              <TabsContent value="shop">
                <ProductUploadForm />
              </TabsContent>
              <TabsContent value="gallery">
                <GalleryUploadForm />
              </TabsContent>
              <TabsContent value="testimonials">
                <TestimonialUploadForm />
              </TabsContent>
              <TabsContent value="contact">
                <ContactSubmissionsManager />
              </TabsContent>
              <TabsContent value="appointments">
                <AppointmentManager />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
