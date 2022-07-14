import { PencilIcon } from "@heroicons/react/solid";
import { Col, Row, Tooltip } from "@nextui-org/react";
import { ColumnDef } from "@tanstack/react-table";
import { IUser } from "../../../intefaces/user";
import { IconButton } from "../../ui/utils/IconButton";

const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: "name",
    header: () => "Nombre",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "username",
    header: () => "Usuario",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "role",
    header: () => "Rol",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "profileId",
    header: () => "Perfil",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "sucursalId",
    header: "Sucursal",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "id",
    header: "Acciones",
    cell: (info) => {
      return (
        <Row css={{ minWidth: "120px" }}>
          <Col css={{ d: "flex", jc: "center" }}>
            <Tooltip content="Editar">
              <IconButton onClick={() => console.log(info.getValue())}>
                <PencilIcon className="h-7 w-7" fill="#979797" />
              </IconButton>
            </Tooltip>
          </Col>
        </Row>
      );
    },
  },
];

export default columns;
