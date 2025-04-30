import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";

const OTPVerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  useEffect(() => {
    // Get the phone number from localStorage
    const storedPhoneNumber = localStorage.getItem("phoneNumber");
    if (storedPhoneNumber) {
      setPhoneNumber(storedPhoneNumber);
    } else {
      // If no phone number is found, redirect back to the phone entry page
      navigate("/enter-phone");
    }

    // Start the countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsResendDisabled(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would verify the OTP with your backend
    // Navigate to the user info page after verification
    navigate("/user-info");
  };

  const handleResendOTP = () => {
    // Reset the timer
    setTimeLeft(30);
    setIsResendDisabled(true);
    // In a real app, you would call your API to resend the OTP
    console.log("Resending OTP to", phoneNumber);
  };

  const handleEditPhoneNumber = () => {
    navigate("/enter-phone");
  };

  // Format the phone number for display (hide middle digits)
  const formatPhoneNumber = (phone: string) => {
    if (!phone) return "";
    const lastFour = phone.slice(-4);
    const firstTwo = phone.slice(0, phone.length - 6);
    return `${firstTwo}******${lastFour}`;
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
        <h1 className="text-xl font-semibold">Freetta</h1>
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">Enter verification code</h2>
            <p className="text-muted-foreground">
              We've sent a 6-digit code to {formatPhoneNumber(phoneNumber)}
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-6">
            <div className="space-y-2">
              <Input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="text-center text-lg py-6"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full py-6"
              disabled={otp.length !== 6}
            >
              Verify & Continue
            </Button>
          </form>

          <div className="flex justify-between items-center">
            <Button
              variant="link"
              onClick={handleEditPhoneNumber}
              className="p-0 h-auto font-normal text-sm"
            >
              Edit phone number
            </Button>

            <Button
              variant="link"
              onClick={handleResendOTP}
              disabled={isResendDisabled}
              className="p-0 h-auto font-normal text-sm"
            >
              {isResendDisabled ? `Resend OTP in ${timeLeft}s` : "Resend OTP"}
            </Button>
          </div>

          <p className="text-sm text-muted-foreground text-center mt-8">
            Having trouble? Please make sure you've entered the correct phone
            number and check your messages for the verification code.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;
