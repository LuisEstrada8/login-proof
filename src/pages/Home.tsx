import { useEffect, useState } from "react";
import { getUsersInformation } from "@/services/get-client";
import { UsersResponse } from "@/types/users-response-types";
import { UserCard } from "@/components/user-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { CreateUserDialog } from "@/components/ui/dialog";


export const Home = () => {
  const [dataUser, setDataUser] = useState<UsersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      const data: UsersResponse = await getUsersInformation("users", page);
      setDataUser(data);
    } catch (error) {
      console.error("Error fetching user information:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const totalPages = dataUser?.total_pages || 1;
  const [open, setOpen] = useState(false)

  return (
    <section>
      <div className="container p-12 md:flex md:justify-between md:justify-items-center md:py-24 md:pb-12 md:px-24 m:py-32">
        <div> 
          <h2 className="text-3xl md:text-4xl font-bold">Clientes</h2>
          <p className="text-xl text-muted-foreground pt-4 pb-8">
            Los clientes con más participación en el programa de referidos
          </p>
        </div>
        <div >
          <Button onClick={() => setOpen(true)}>Agregar usuario</Button>
          <CreateUserDialog  open={open} onOpenChange={setOpen} />
        </div>
        </div>

        {/* Lista de clientes */}
        <div className="container grid p-12 md:grid-cols-2 lg:grid-cols-4 sm:block columns-2 lg:columns-3 lg:gap-6 mx-auto space-y-4 lg:space-y-6">
          {loading && (
            <div className="flex flex-wrap gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-[125px] w-[250px] rounded-xl"
                />
              ))}
            </div>
          )}
          {!loading &&
            dataUser &&
            dataUser.data.map((user) => (
              <UserCard
                key={user.id}
                image={user.avatar}
                comment={user.email}
                fallback={user.first_name.charAt(0)}
                name={user.first_name + " " + user.last_name}
              />
            ))}
        </div>

        {/* Paginación */}
        <div className="flex p-8 justify-center mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === index + 1}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(index + 1);
                    }}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

    </section>
  );
};

