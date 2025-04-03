import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card"

interface UserCardProps { 
    image: string;
    name: string;
    fallback:string;
    comment: string;
  }
  

export const UserCard = ({image, fallback, comment, name }: UserCardProps) => {
    return(
        <Card className="max-w-md md:break-inside-avoid overflow-hidden">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar>
                  <AvatarImage
                    className="object-cover w-[50px] h-[50px] rounded-full"
                    alt=""
                    src={image}
                  />
                  <AvatarFallback>{fallback}</AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <CardTitle className="text-lg">{name}</CardTitle>
                  <CardDescription >{comment}</CardDescription>
                </div>
              </CardHeader>
            </Card>
    )
}