"use client";

import { Fragment, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { format } from "date-fns";
import { AiOutlineRight } from "react-icons/ai";

import Avatar from "@/components/header/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import UpdateAddressModal from "./_components/update-address-modal";
import UpdateDateOfBirthModal from "./_components/update-date-of-birth-modal";
import UpdateDisplayNameModal from "./_components/update-display-name-modal";
import UpdateFullNameModal from "./_components/update-full-name-modal";
import UpdatePhoneNumberModal from "./_components/update-phone-number-modal";

export default function ProfilePage() {
  const { authUser, userDetails } = useAuth();
  const [updateDisplayName, setUpdateDisplayName] = useState(false);
  const [updateFullName, setUpdateFullName] = useState(false);
  const [updateDateOfBirth, setUpdateDateOfBirth] = useState(false);
  const [updatePhoneNumber, setUpdatePhoneNumber] = useState(false);
  const [updateAddress, setUpdateAddress] = useState(false);
  return (
    <section>
      <UpdateDisplayNameModal
        open={updateDisplayName}
        closeModal={() => setUpdateDisplayName(false)}
      />
      <UpdateFullNameModal
        open={updateFullName}
        closeModal={() => setUpdateFullName(false)}
      />
      <UpdateDateOfBirthModal
        open={updateDateOfBirth}
        closeModal={() => setUpdateDateOfBirth(false)}
      />
      <UpdatePhoneNumberModal
        open={updatePhoneNumber}
        closeModal={() => setUpdatePhoneNumber(false)}
      />
      <UpdateAddressModal
        open={updateAddress}
        closeModal={() => setUpdateAddress(false)}
      />
      <div className="flex flex-col">
        {authUser && (
          <Fragment>
            <div className="flex items-center gap-4 pb-6">
              <Avatar
                className="h-12 w-12"
                textClassName="text-2xl"
                name={
                  authUser.displayName ||
                  `${userDetails?.first_name} ${userDetails?.last_name}` ||
                  ""
                }
              />
              {authUser.displayName ? (
                <span className="text-2xl">{authUser.displayName}</span>
              ) : (
                <span>{authUser.email}</span>
              )}
              <div className="flex gap-1">
                {userDetails?.role.map((item, index) => (
                  <Badge key={index} variant="secondary">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 border-t border-slate-100 py-4">
              <div>Email address</div>
              <div className="flex flex-col items-start gap-2">
                {authUser.email}
              </div>
            </div>
            <div className="grid grid-cols-3 border-t border-slate-100 py-6">
              <div>Display name</div>
              <div className="flex flex-col items-start gap-2">
                {authUser.displayName}
                <Button
                  onClick={() => setUpdateDisplayName(true)}
                  variant="link"
                  className="flex h-auto gap-1 p-0"
                >
                  {authUser.displayName ? "Edit" : "Add"}
                  <AiOutlineRight />
                </Button>
              </div>
            </div>
          </Fragment>
        )}
        {userDetails && (
          <Fragment>
            <div className="grid grid-cols-3 border-t border-slate-100 py-6">
              <div>Full name</div>
              <div className="flex flex-col items-start gap-2">
                {`${userDetails.first_name} ${userDetails.last_name}`}
                <Button
                  onClick={() => setUpdateFullName(true)}
                  variant="link"
                  className="flex h-auto gap-1 p-0"
                >
                  Edit
                  <AiOutlineRight />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-3 border-t border-slate-100 py-6">
              <div>Date of birth</div>
              <div className="flex flex-col items-start gap-2">
                {!!userDetails.dob &&
                  format(new Date(Number(userDetails.dob)), "LL/dd/yyyy")}
                <Button
                  onClick={() => setUpdateDateOfBirth(true)}
                  variant="link"
                  className="flex h-auto gap-1 p-0"
                >
                  Edit
                  <AiOutlineRight />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-3 border-t border-slate-100 py-6">
              <div>Phone number</div>
              <div className="flex flex-col items-start gap-2">
                {userDetails?.phone_number}
                <Button
                  onClick={() => setUpdatePhoneNumber(true)}
                  variant="link"
                  className="flex h-auto gap-1 p-0"
                >
                  Edit
                  <AiOutlineRight />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-3 border-t border-slate-100 py-6">
              <div>Address</div>
              <div className="flex flex-col items-start gap-2">
                {userDetails?.postal_code && (
                  <div>{userDetails.postal_code}</div>
                )}
                {userDetails?.street && <div>{userDetails.street}</div>}
                {userDetails?.province && <div>{userDetails.province}</div>}
                <Button
                  onClick={() => setUpdateAddress(true)}
                  variant="link"
                  className="flex h-auto gap-1 p-0"
                >
                  Edit
                  <AiOutlineRight />
                </Button>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </section>
  );
}
