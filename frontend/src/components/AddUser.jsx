import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "./Textbox";
import Loading from "./Loader";
import Button from "./Button";
import { toast } from 'react-toastify'; // Ensure toast is imported
import URLS from "../utils/constant";


const AddUser = ({ open, setOpen, userData, onAddUser }) => {
  const defaultValues = userData ?? {};
  const { user } = useSelector((state) => state.auth);

  const isLoading = false; // Update this based on actual loading state
  const isUpdating = false; // Update this based on actual updating state

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const handleOnSubmit = async (data) => {
    try {
        console.log("Submitting form");

        if (userData) {
            // Proceed with updating the existing user without checking for user ID
            const response = await fetch(`${URLS.BackendEndPoint}/users/${userData._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("Failed to update user");
            toast.success(`User updated successfully!`);
        } else {
            // Add new user
            onAddUser(data); // Call the function to add a user
            toast.success(`User added successfully!`);
        }
        setOpen(false); // Close modal after submission
    } catch (error) {
        console.error("Error:", error);
        toast.error(`Error: ${error.message}`);
    }
};



  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Dialog.Title as='h2' className='text-base font-bold leading-6 text-gray-900 mb-4'>
          {userData ? "UPDATE PROFILE" : "ADD NEW USER"}
        </Dialog.Title>
        <div className='mt-2 flex flex-col gap-6'>
          <Textbox
            placeholder='Full name'
            type='text'
            name='name'
            label='Full Name'
            className='w-full rounded'
            register={register("name", { required: "Full name is required!" })}
            error={errors.name ? errors.name.message : ""}
          />
          <Textbox
            placeholder='Title'
            type='text'
            name='title'
            label='Title'
            className='w-full rounded'
            register={register("title", { required: "Title is required!" })}
            error={errors.title ? errors.title.message : ""}
          />
          <Textbox
            placeholder='Email Address'
            type='email'
            name='email'
            label='Email Address'
            className='w-full rounded'
            register={register("email", { required: "Email Address is required!" })}
            error={errors.email ? errors.email.message : ""}
          />
          <Textbox
            placeholder='Role'
            type='text'
            name='role'
            label='Role'
            className='w-full rounded'
            register={register("role", { required: "User role is required!" })}
            error={errors.role ? errors.role.message : ""}
          />
        </div>
        {isLoading || isUpdating ? (
          <div className='py-5'>
            <Loading />
          </div>
        ) : (
          <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
            <Button
              type='submit'
              className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto'
              label='Submit'
            />
            <Button
              type='button'
              className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
              label='Cancel'
              onClick={() => setOpen(false)}
            />
          </div>
        )}
      </form>
    </ModalWrapper>
  );
};

export default AddUser;
