import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft } from "lucide-react";

const EnterPhoneNumberPage: React.FC = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91"); // Default to India

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store the phone number in localStorage or state management solution
    localStorage.setItem("phoneNumber", `${countryCode}${phoneNumber}`);
    navigate("/verify-otp");
  };

  return (
    <div className="flex flex-col min-h-screen bg-background p-4">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="mr-2"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">Enter Phone Number</h1>
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">Verify your phone number</h2>
            <p className="text-muted-foreground">
              We'll send you a one-time password to verify your identity
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex space-x-2">
              <Select value={countryCode} onValueChange={setCountryCode}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Code" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+91">+91 🇮🇳</SelectItem>
                  <SelectItem value="+1">+1 🇺🇸</SelectItem>
                  <SelectItem value="+44">+44 🇬🇧</SelectItem>
                  <SelectItem value="+61">+61 🇦🇺</SelectItem>
                  <SelectItem value="+65">+65 🇸🇬</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="tel"
                placeholder="Phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="flex-1"
                required
                pattern="[0-9]{10}"
                maxLength={10}
              />
            </div>
            <Button
              type="submit"
              className="w-full py-6"
              disabled={phoneNumber.length < 10}
            >
              Continue
            </Button>
          </form>

          <p className="text-sm text-muted-foreground text-center">
            We'll send a text with a verification code. Message and data rates
            may apply.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnterPhoneNumberPage;
