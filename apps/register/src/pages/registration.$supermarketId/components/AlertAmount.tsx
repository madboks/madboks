import React from 'react'

import { type Vegetables } from '@prisma/client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'

interface AlertProps {
  isOpen: boolean
  kg: number
  vegetable: string
  vegetables?: Array<Pick<Vegetables, 'id' | 'name' | 'guideline'>>
  onConfirm?: () => void
  onCancel?: () => void
}

export function AlertAmount ({
  isOpen = false,
  kg,
  vegetable,
  vegetables,
  onConfirm = () => {},
  onCancel = () => {}
}: AlertProps) {
  const vegetableName = vegetables?.find(({ name }) => name === vegetable)?.name

  return (
    <AlertDialog open={isOpen} onOpenChange={onCancel}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>You are registering a large amount!</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to register <b>{kg} kg</b> {vegetableName ? `of ${vegetableName}` : ''}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
};
