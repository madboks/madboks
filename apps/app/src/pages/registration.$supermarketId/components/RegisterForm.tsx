import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'

import { type Countries, type Vegetables } from '@prisma/client'

import { Button } from '@/components/ui/button'
import { CommandDialog, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { IconUpDown } from '@/components/icons/upDown'

import { cn } from '@/lib/utils'

import { items as itemsSchema } from '../schemas/items'
import { IconClose } from '@/components/icons/close'
import { AlertAmount } from './AlertAmount'
import { Checkbox } from '@/components/ui/checkbox'

type RegisterFormProduct = {
  id: string;
  barcode: string;
  vegetableId?: string;
  countryCode?: string;
  kg: number;
}

type Vegetable = Pick<Vegetables, 'id' | 'name' | 'guideline'>

export interface RegisterFormProps {
  countries?: Countries[]
  barcode?: string
  product?: RegisterFormProduct
  vegetables?: Vegetable[]
  onBarcodeChange?: (code: string) => void
  onReset?: () => void
  onSubmit: (data: z.infer<typeof itemsSchema>) => void
}

const findVegetable = (vegetables: Vegetable[], id?: string) => {
  if (!id) {
    return undefined
  }

  return vegetables?.find(vegetable => vegetable.id === id)
}

export function RegisterForm ({
  countries = [],
  barcode,
  product,
  vegetables = [],
  onBarcodeChange = () => {},
  onReset = () => {},
  onSubmit,
}: RegisterFormProps) {
  const [vegetablesSelectorOpen, setVegetablesSelectorOpen] = React.useState(false)
  const [countriesSelectorOpen, setCountriesSelectorOpen] = React.useState(false)
  const [alertIsOpen, setOpenAlert] = React.useState(false)

  const inputAmountRef = React.useRef<HTMLInputElement | null>(null);

  const defaultValues = {
    barcode: product ? product.barcode : barcode ? barcode : '',
    vegetableId: product ? product.vegetableId : '',
    countryCode: product ? product.countryCode : '',
  }

  const selectedVegetable = findVegetable(vegetables, product?.vegetableId)

  const form = useForm<z.infer<typeof itemsSchema>>({
    resolver: zodResolver(itemsSchema),
    mode: 'onTouched',
    defaultValues: {
      ...defaultValues,
      kg: product?.kg,
      amount: 1,
    }
  })

  const handleReset = () => onReset()

  const preSubmit = (values: z.infer<typeof itemsSchema>) => {
    if (values.kg >= 10) {
      setOpenAlert(true)
      return
    }

    if (values.barcode === '') {
      const vegetable = findVegetable(vegetables, values.vegetableId) as Vegetable

      onSubmit({
        ...values,
        barcode: `unknown-${vegetable.name.toLowerCase()}`
      })
    }

  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(preSubmit)}
          className='space-y-4 relative'
        >
          <div>
            <FormField
              control={form.control}
              name='barcode'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className='font-semibold text-sm'>Bar code</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          type='text'
                          placeholder='5710326013084'
                          {...field}
                          autoFocus
                          onChange={(e) => {
                            field.onChange(e)
                            onBarcodeChange(e.target.value)
                          }}
                        />
                        <Button
                          variant='link'
                          size='icon'
                          className='h-4 w-4 absolute top-1/2 right-2 transform -translate-y-1/2 '
                          onClick={handleReset}
                          type='button'
                        >
                          <IconClose className='text-muted-foreground' />
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription>Write the barcode for the product that you are registering or leave it empty in case of loose vegetables</FormDescription>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          </div>

          <div className='space-y-4 sm:space-y-0 sm:gap-x-4 sm:grid sm:grid-cols-2'>
            <FormField
              control={form.control}
              name='vegetableId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold text-sm'>Product</FormLabel>
                  <FormControl>
                    <Button
                      variant='outline'
                      role='combobox'
                      disabled={!!product}
                      className={cn(
                        'w-full justify-between',
                        !field.value && 'text-muted-foreground'
                      )}
                      onClick={() => setVegetablesSelectorOpen(true)}
                    >
                      {field.value
                        ? vegetables.find(
                          (vegetable) => vegetable.id === field.value
                        )?.name
                        : 'Select a vegetable'}
                      <IconUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </FormControl>

                  <CommandDialog
                    open={vegetablesSelectorOpen}
                    onOpenChange={setVegetablesSelectorOpen}
                    className='!w-11/12'
                  >
                    <CommandInput placeholder='Writte the name of a vegetable...' />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      {vegetables.map((vegetable) => (
                        <CommandItem
                          key={vegetable.id}
                          className='!px-10 cursor-pointer'
                          onSelect={() => {
                            form.setValue('vegetableId', vegetable.id)
                            setVegetablesSelectorOpen(false)
                          }}
                        >
                          {vegetable.name}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </CommandDialog>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='countryCode'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold text-sm'>Country</FormLabel>
                  <FormControl>
                    <Button
                      variant='outline'
                      role='combobox'
                      disabled={!!product}
                      className={cn(
                        'w-full justify-between',
                        !field.value && 'text-muted-foreground'
                      )}
                      onClick={() => setCountriesSelectorOpen(true)}
                    >
                      {field.value
                        ? countries.find(
                          (country) => country.code === field.value
                        )?.name
                        : 'Select a country'}
                      <IconUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </FormControl>

                  <CommandDialog
                    open={countriesSelectorOpen}
                    onOpenChange={setCountriesSelectorOpen}
                    className='!w-11/12'
                  >
                    <CommandInput placeholder='Writte the name of the country ...' />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      {countries.map((country) => (
                        <CommandItem
                          key={country.code}
                          className='!px-10 cursor-pointer'
                          onSelect={() => {
                            form.setValue('countryCode', country.code)
                            setCountriesSelectorOpen(false)
                          }}
                        >
                          {country.name}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </CommandDialog>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='gap-x-4 grid grid-cols-2'>
            <FormField
              control={form.control}
              name='amount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold text-sm'>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='2'
                      {...field}
                      ref={inputAmountRef}
                    />
                  </FormControl>
                  <FormDescription className='text-xs'>
                    Number of items that have the same barcode
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='kg'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold text-sm'>Kg</FormLabel>
                  <FormControl className='relative'>
                    <div>
                      <Input
                        type='number'
                        placeholder='0.5'
                        step='.01'
                        className='pr-8'
                        {...field}
                        disabled={!!product}
                      />
                      <div className='text-sm font-bold absolute top-1/2 right-2 transform -translate-y-1/2 text-muted-foreground'>
                        kg
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription className='text-xs'>
                    <span>Package weight in <b>kg</b>.</span>
                    {selectedVegetable?.guideline !== undefined ? <span>Guideline: <b>{selectedVegetable?.guideline}</b> kg</span> : null}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>

          <div className='text-center'>
            <Button
              type='submit'
              className='w-full md:w-2/3'
              disabled={!form.formState.isValid}
            >Submit</Button>
          </div>
        </form>
      </Form>

      <AlertAmount
        isOpen={alertIsOpen}
        kg={form.getValues('kg')}
        vegetable={form.getValues('vegetableId')}
        vegetables={vegetables}
        onConfirm={onSubmit}
        onCancel={() => setOpenAlert(false)}
      />
    </>
  )
};
