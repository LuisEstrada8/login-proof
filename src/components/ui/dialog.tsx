import * as Dialog from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { postCreateUsers } from "@/services/post-create-users"
import { useState } from "react"
import { Spinner } from "./spinner"
import { toast } from "sonner"

export function CreateUserDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {

  const [isLoading, setIsLoading] = useState(false)


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string | null;
    const job = formData.get("job") as string | null;

    if (name && job) {
      setIsLoading(true)
      postCreateUsers("users", name, job)
        .then(() => {
            toast.success("Se registro cliente correctamente.")
        })
        .catch(() => {
          toast.error("Ha habido un error intentelo mas tarde.")
        })
        .finally(() => {
          setIsLoading(false)
          onOpenChange(false)
        })
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content
          className={cn(
            "fixed z-50 top-[50%] left-[50%] w-5/6 md:w-full max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-lg border bg-white p-6 shadow-lg focus:outline-none"
          )}
        >
          <Dialog.Title className="text-xl font-bold">
            Crear nuevo usuario
          </Dialog.Title>
          <Dialog.Description className="text-sm text-muted-foreground mb-4">
            Completa el siguiente formulario para agregar un cliente.
          </Dialog.Description>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="job">Trabajo</Label>
              <Input id="job" name="job" type="job" required />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Dialog.Close asChild>
                <Button variant="outline" type="button">Cancelar</Button>
              </Dialog.Close>
                <Button type="submit">
                {isLoading ? <Spinner className="text-amber-50 p-1" show={isLoading} /> : "Agregar"}
                </Button>
            </div>
          </form>

          <Dialog.Close asChild>
            <button className="absolute top-4 right-4 text-muted-foreground hover:text-black">
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Cerrar</span>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
