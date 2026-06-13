import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/kit/card';

export function AuthLayout({
  form,
  title,
  description,
  footerText,
}: {
  form: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  footerText: React.ReactNode;
}) {
  return (
    <main className='grow flex flex-col pt-[200px] items-center'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{form}</CardContent>
        <CardFooter>
          <p className='text-sm text-muted-foreground [&_a]:underline [&_a]:hover:text-primary'>
            {footerText}
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
