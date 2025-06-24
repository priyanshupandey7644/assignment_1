
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Upload, User, Briefcase, MapPin, IndianRupee, Camera, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import { categories, languages, feeRanges } from "@/data/mockData";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  bio: z.string().min(50, "Bio must be at least 50 characters"),
  categories: z.array(z.string()).min(1, "Please select at least one category"),
  languages: z.array(z.string()).min(1, "Please select at least one language"),
  feeRange: z.string().min(1, "Please select a fee range"),
  location: z.string().min(2, "Location is required"),
  experience: z.string().min(1, "Experience is required"),
  specialties: z.string().optional(),
  profileImage: z.any().optional()
});

type FormData = z.infer<typeof formSchema>;

const ArtistOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange"
  });

  const availableCategories = categories.filter(cat => cat !== "All Categories");

  const handleCategoryChange = (category: string, checked: boolean) => {
    const updated = checked 
      ? [...selectedCategories, category]
      : selectedCategories.filter(c => c !== category);
    
    setSelectedCategories(updated);
    setValue("categories", updated, { shouldValidate: true });
  };

  const handleLanguageChange = (language: string, checked: boolean) => {
    const updated = checked 
      ? [...selectedLanguages, language]
      : selectedLanguages.filter(l => l !== language);
    
    setSelectedLanguages(updated);
    setValue("languages", updated, { shouldValidate: true });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("profileImage", file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Artist registration data:", {
        ...data,
        categories: selectedCategories,
        languages: selectedLanguages
      });

      toast({
        title: "Registration Successful! 🎉",
        description: "Your artist profile has been submitted for review. You'll hear from us within 24 hours.",
      });

      // Reset form or redirect
      setCurrentStep(1);
      setSelectedCategories([]);
      setSelectedLanguages([]);
      setImagePreview(null);
      
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <User className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Personal Information</h2>
              <p className="text-gray-600">Let's start with the basics</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="City, State"
                  {...register("location")}
                />
                {errors.location && (
                  <p className="text-red-500 text-sm">{errors.location.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio / Description *</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself, your experience, and what makes you unique (minimum 50 characters)"
                rows={4}
                {...register("bio")}
              />
              {errors.bio && (
                <p className="text-red-500 text-sm">{errors.bio.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience *</Label>
              <Select onValueChange={(value) => setValue("experience", value, { shouldValidate: true })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-2 years">1-2 years</SelectItem>
                  <SelectItem value="3-5 years">3-5 years</SelectItem>
                  <SelectItem value="5-10 years">5-10 years</SelectItem>
                  <SelectItem value="10+ years">10+ years</SelectItem>
                </SelectContent>
              </Select>
              {errors.experience && (
                <p className="text-red-500 text-sm">{errors.experience.message}</p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Briefcase className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Professional Details</h2>
              <p className="text-gray-600">Tell us about your expertise</p>
            </div>

            <div className="space-y-4">
              <Label>Categories * (Select all that apply)</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableCategories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                    />
                    <Label htmlFor={category} className="text-sm font-medium cursor-pointer">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.categories && (
                <p className="text-red-500 text-sm">{errors.categories.message}</p>
              )}
              {selectedCategories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedCategories.map((category) => (
                    <Badge key={category} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <Label>Languages Spoken * (Select all that apply)</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {languages.map((language) => (
                  <div key={language} className="flex items-center space-x-2">
                    <Checkbox
                      id={language}
                      checked={selectedLanguages.includes(language)}
                      onCheckedChange={(checked) => handleLanguageChange(language, checked as boolean)}
                    />
                    <Label htmlFor={language} className="text-sm font-medium cursor-pointer">
                      {language}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.languages && (
                <p className="text-red-500 text-sm">{errors.languages.message}</p>
              )}
              {selectedLanguages.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedLanguages.map((language) => (
                    <Badge key={language} variant="secondary">
                      {language}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialties">Specialties (Optional)</Label>
              <Textarea
                id="specialties"
                placeholder="List your specialties, unique skills, or notable achievements"
                rows={3}
                {...register("specialties")}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <IndianRupee className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Pricing & Media</h2>
              <p className="text-gray-600">Set your rates and upload profile image</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="feeRange">Fee Range *</Label>
              <Select onValueChange={(value) => setValue("feeRange", value, { shouldValidate: true })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your fee range" />
                </SelectTrigger>
                <SelectContent>
                  {feeRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.feeRange && (
                <p className="text-red-500 text-sm">{errors.feeRange.message}</p>
              )}
            </div>

            <div className="space-y-4">
              <Label>Profile Image (Optional)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                {imagePreview ? (
                  <div className="space-y-4">
                    <img
                      src={imagePreview}
                      alt="Profile preview"
                      className="w-32 h-32 object-cover rounded-full mx-auto"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setImagePreview(null);
                        setValue("profileImage", undefined);
                      }}
                    >
                      Remove Image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Camera className="h-12 w-12 text-gray-400 mx-auto" />
                    <div>
                      <Label
                        htmlFor="profileImage"
                        className="cursor-pointer inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        <Upload className="h-4 w-4" />
                        Upload Image
                      </Label>
                      <Input
                        id="profileImage"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      PNG, JPG up to 10MB. Recommended: 400x400px
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Review & Submit</h2>
              <p className="text-gray-600">Please review your information before submitting</p>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p><strong>Name:</strong> {watch("name")}</p>
                  <p><strong>Location:</strong> {watch("location")}</p>
                  <p><strong>Experience:</strong> {watch("experience")}</p>
                  <p><strong>Bio:</strong> {watch("bio")}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Professional Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <strong>Categories:</strong>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedCategories.map((category) => (
                        <Badge key={category} variant="secondary">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <strong>Languages:</strong>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedLanguages.map((language) => (
                        <Badge key={language} variant="secondary">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <p><strong>Fee Range:</strong> {watch("feeRange")}</p>
                  {watch("specialties") && (
                    <p><strong>Specialties:</strong> {watch("specialties")}</p>
                  )}
                </CardContent>
              </Card>

              {imagePreview && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Profile Image</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img
                      src={imagePreview}
                      alt="Profile preview"
                      className="w-24 h-24 object-cover rounded-full"
                    />
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Join Artistly as a Performer
            </h1>
            <p className="text-xl text-gray-600">
              Share your talent with event planners across India
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Form */}
          <Card>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                {renderStepContent()}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>

                  {currentStep < totalSteps ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Next Step
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting || !isValid}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Benefits Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Get Discovered</h3>
              <p className="text-sm text-gray-600">Reach thousands of event planners looking for talent</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Briefcase className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Manage Bookings</h3>
              <p className="text-sm text-gray-600">Handle all your bookings through our platform</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <IndianRupee className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Secure Payments</h3>
              <p className="text-sm text-gray-600">Get paid safely and on time for every performance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistOnboarding;
