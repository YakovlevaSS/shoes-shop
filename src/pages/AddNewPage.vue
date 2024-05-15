<!-- <template>
    <Form>
      <Field name="email" type="email" :rules="fieldSchema" />
      <ErrorMessage name="email" />
    </Form>
  </template>
  
  <script setup>
  import { Field, Form, ErrorMessage } from 'vee-validate';
  import { toTypedSchema } from '@vee-validate/zod';
  import * as zod from 'zod';
  const fieldSchema = toTypedSchema(zod.string().nonempty('Field is required').email('Must be a valid email'));
  </script> -->

<!-- <template>
    <Form :validation-schema="validationSchema" class="w-80 mx-auto" @submit="onSubmit">
        <div class="mb-4">
            <label for="email" class="block text-gray-700 font-bold mb-2">Email</label>
            <Field name="email" type="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            <ErrorMessage name="email" class="text-red-500 text-xs italic"/>
        </div>

        <div class="mb-4">
            <label for="password" class="block text-gray-700 font-bold mb-2">Password</label>
            <Field name="password" type="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            <ErrorMessage name="password" class="text-red-500 text-xs italic"/>
        </div>

        <div class="mb-4">
            <label for="confirmPassword" class="block text-gray-700 font-bold mb-2">Confirm Password</label>
            <Field name="confirmPassword" type="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            <ErrorMessage name="confirmPassword" class="text-red-500 text-xs italic"/>
        </div>

        <button type="submit" >Submit</button>
    </Form>
</template>

<script setup>
import { Field, Form, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

const validationSchema = toTypedSchema(
    zod.object({
        email: zod
        .string()
        .min(1, "Поле пустое")
        .email("Поле должно быть email"),
        password: zod
        .string()
        .min(1, "Поле пустое"),
}))

function onSubmit(value) {
    alert(JSON.stringify(value, null, 2))
}
</script> -->


<template>
    <form class="w-80 mx-auto" @submit="onSubmit">
        <div class="mb-4">
            <label for="email" class="block text-gray-700 font-bold mb-2">Email</label>
            <input id="email" type="email" v-model="email" 
                :class="{ 'border-red-500': errors.email }"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            <span class="text-red-500 text-xs italic">{{ errors.email }}</span>
        </div>

        <div class="mb-4">
            <label for="password" class="block text-gray-700 font-bold mb-2">Password</label>
            <input id="password" type="password" v-model="password" 
                :class="{ 'border-red-500': errors.password }"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            <span class="text-red-500 text-xs italic">{{ errors.password }}</span>
        </div>

        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
    </form>
</template>

<script setup>
import { toTypedSchema } from '@vee-validate/zod';
import { useForm, useField } from 'vee-validate';
import * as zod from 'zod';


const validationSchema = toTypedSchema(
    zod.object({
        email: zod
            .string()
            .min(1, "Поле пустое")
            .email("Поле должно быть email"),
        password: zod
            .string()
            .min(1, "Поле пустое"),
    }))

const { handleSubmit, errors } = useForm({ validationSchema })
const { value: email } = useField("email");
const { value: password } = useField("password");
const onSubmit = handleSubmit((value) => {
    alert(JSON.stringify(value, null, 2))
})
</script>