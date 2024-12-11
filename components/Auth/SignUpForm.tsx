import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SocialAuth } from './SocialAuth';

export function SignUpForm() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-lg mx-auto"
    >
      <Card className="border-none shadow-none">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl text-center font-bold text-green-600">
            Create Account
          </CardTitle>
          <CardDescription className='text-center'>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <SocialAuth />
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                className="h-11"
              />
            </div>
            <Button className="h-11 w-full bg-green-600 hover:bg-green-700">
              Create Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}