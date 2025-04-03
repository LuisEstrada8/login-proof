import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { InputPassword } from "./input-password"
import { postLoginSession } from "@/services/post-login"
import { loginTypes } from "@/types/login-response-types"
import { useNavigate } from "react-router-dom"
import { Spinner } from "./ui/spinner"
import { toast } from "sonner"


const FormSchema = z.object({
  email: z.string().email({
    message: "Correo electrónico inválido.",
  }),
  password: z
    .string()
    .min(8, {
      message: "La contraseña debe tener al menos 8 caracteres.",
    })
    .regex(/[A-Z]/, {
      message: "La contraseña debe contener al menos una letra mayúscula.",
    })
    .regex(/[0-9]/, {
      message: "La contraseña debe contener al menos un número.",
    }),
})
 
export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const navigate = useNavigate();

  const onSubmit  = async (data: z.infer<typeof FormSchema>) => {
    try {
      const response: loginTypes = await postLoginSession("login", data.email, data.password)
      if (response.token) {
        sessionStorage.setItem("authToken", response.token)
        navigate("/")
        toast.success("Login exitoso.")
      }
    } catch (error: any) {
      console.error("Error al obtener respuesta de login:", error)
    
      if (error.response?.status === 400) {
        toast.error("Error de conexión o del servidor. Intenta más tarde.")
      } else {
        toast.error("Credenciales incorrectas. Intenta nuevamente.")
      }
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="ingrese email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <InputPassword placeholder="ingrese contraseña" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-4 w-full">
                <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
                  Submit
                    <Spinner className="text-amber-50 p-1" show={form.formState.isSubmitting} />
                </Button>
              </div>
            </form>
        </Form>
        </CardContent>
      </Card>
    </div>
  )
}