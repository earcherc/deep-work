'use client';

import useToast from '@app/context/toasts/toast-context';
import { userAtom } from '@app/store/atoms';
import { UserInput, useUpdateCurrentUserMutation } from '@/graphql/graphql-types';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function UserForm() {
  const { addToast } = useToast();
  const [user, setUser] = useAtom(userAtom);
  const [updateUserResult, updateUser] = useUpdateCurrentUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserInput>({
    defaultValues: {
      email: '',
      username: '',
      bio: '',
      jobTitle: '',
      personalTitle: '',
      dateOfBirth: '',
      latitude: undefined,
      longitude: undefined,
      firstName: '',
      lastName: '',
      gender: undefined,
      profilePhotoUrl: '',
      timezone: '',
      language: '',
      status: '',
    },
  });

  useEffect(() => {
    reset({
      email: user?.email || '',
      username: user?.username || '',
      bio: user?.bio || '',
      jobTitle: user?.jobTitle || '',
      personalTitle: user?.personalTitle || '',
      dateOfBirth: user?.dateOfBirth || '',
      latitude: user?.latitude,
      longitude: user?.longitude,
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      gender: user?.gender,
      profilePhotoUrl: user?.profilePhotoUrl || '',
      timezone: user?.timezone || '',
      language: user?.language || '',
      status: user?.status || '',
    });
  }, [user, reset]);

  const onSubmit = async (data: UserInput) => {
    try {
      let submitData = { ...data };

      // Remove fields from submitData if they are empty or undefined
      if (!submitData.dateOfBirth) {
        delete submitData.dateOfBirth;
      }
      if (submitData.latitude === undefined) {
        delete submitData.latitude;
      }
      if (submitData.longitude === undefined) {
        delete submitData.longitude;
      }
      if (submitData.gender === undefined) {
        delete submitData.gender;
      }

      const result = await updateUser({ user: submitData });
      if (result.data) {
        setUser(result.data.updateCurrentUser);
        addToast({ type: 'success', content: 'User profile updated successfully.' });
      } else {
        // Handle case when result.data is not as expected
        console.error('Failed to update user:', result.error);
        addToast({ type: 'error', content: 'Failed to update user profile.' });
      }
    } catch (error) {
      console.error('Error updating user:', error);
      addToast({ type: 'error', content: 'An error occurred while updating the profile.' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
        <div className="col-span-3">
          <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-white">
            First Name
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="firstName"
              {...register('firstName')}
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 pl-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="col-span-3">
          <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-white">
            Last Name
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="lastName"
              {...register('lastName')}
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 pl-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="col-span-full">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              {...register('email')}
              type="email"
              autoComplete="email"
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 pl-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="col-span-full">
          <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
            Username
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="username"
              {...register('username')}
              autoComplete="username"
              className=".5 block w-full rounded-md border-0 bg-white/5 py-1 pl-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="col-span-3">
          <label htmlFor="dateOfBirth" className="block text-sm font-medium leading-6 text-white">
            Date of Birth
          </label>
          <div className="mt-2">
            <input
              type="date"
              id="dateOfBirth"
              {...register('dateOfBirth')}
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 pl-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="col-span-3">
          <label htmlFor="gender" className="block text-sm font-medium leading-6 text-white">
            Gender
          </label>
          <div className="mt-2">
            <select
              id="gender"
              {...register('gender')}
              className="block w-full rounded-md border-0 bg-white/5 py-2.5 pl-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
              <option value="NOT_SPECIFIED">Not Specified</option>
            </select>
          </div>
        </div>

        <div className="col-span-full">
          <label htmlFor="bio" className="block text-sm font-medium leading-6 text-white">
            Bio
          </label>
          <div className="mt-2">
            <textarea
              id="bio"
              {...register('bio')}
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 pl-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="col-span-3">
          <label htmlFor="jobTitle" className="block text-sm font-medium leading-6 text-white">
            Job Title
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="jobTitle"
              {...register('jobTitle')}
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 pl-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="col-span-3">
          <label htmlFor="personalTitle" className="block text-sm font-medium leading-6 text-white">
            Personal Title
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="personalTitle"
              {...register('personalTitle')}
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 pl-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="col-span-3">
          <label htmlFor="latitude" className="block text-sm font-medium leading-6 text-white">
            Latitude
          </label>
          <div className="mt-2">
            <input
              type="number"
              id="latitude"
              {...register('latitude')}
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 pl-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="col-span-3">
          <label htmlFor="longitude" className="block text-sm font-medium leading-6 text-white">
            Longitude
          </label>
          <div className="mt-2">
            <input
              type="number"
              id="longitude"
              {...register('longitude')}
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 pl-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="col-span-3">
          <label htmlFor="timezone" className="block text-sm font-medium leading-6 text-white">
            Timezone
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="timezone"
              {...register('timezone')}
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 pl-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="col-span-3">
          <label htmlFor="language" className="block text-sm font-medium leading-6 text-white">
            Language
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="language"
              {...register('language')}
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 pl-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="col-span-full">
          <label htmlFor="status" className="block text-sm font-medium leading-6 text-white">
            Status
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="status"
              {...register('status')}
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 pl-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex">
        <button
          type="submit"
          className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Save
        </button>
      </div>
    </form>
  );
}
