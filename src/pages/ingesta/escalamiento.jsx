import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Boton from '@/components/Boton';
import Registro from '@/components/RegistroIngestaUsuarios';
import { Meta } from '@/layouts/Meta';
import Main from '@/templates/Main';
import { config } from '@/utils/constants';
import { Tema, Tipo } from '@/utils/Types';
import { toast } from 'react-toastify';
// import comprobarPermisos from '@/utils/comprobarPermisos';
// import { getSession } from 'next-auth/react';

const DataTable = dynamic(
  () => import('../../components/DataTableEscalamiento'),
  {
    ssr: false,
  }
);
const Escalamiento = ({ data, error, dato }) => {
  const [actualizar, setActualizar] = useState({
    activo: false,
    idDato: undefined,
    idFila: undefined,
  });
  const [ingestaUsuarios, setIngestaUsuarios] = useState(
    data.map((ingestaUsuario) => ({
      id: ingestaUsuario.ID_ARCHIVO,
      estatus: ingestaUsuario.ESTATUS,
      archivo: ingestaUsuario.NOMBRE_ARCHIVO,
      fecha_y_hora_ingesta: ingestaUsuario.FECHA_CARGA.value,
      subRows: undefined,
    }))
  );

  useEffect(() => {
    if (error) toast.error('Hubo un problema contactando al servidor.');
  }, [error]);

  return (
    <Main meta={<Meta title="Componentes" description="Componentes" />}>
      <div className="flex w-full flex-col items-center gap-4">
        <Boton
          tipo={Tipo.agregar}
          texto="Agregar archivo"
          tema={Tema.blanco}
          onClick={() => setActualizar((prev) => ({ ...prev, activo: true }))}
        />
        <DataTable
          rows={ingestaUsuarios}
          setActualizar={setActualizar}
          setData={setIngestaUsuarios}
        />
        <Registro
          actualizar={actualizar}
          setActualizar={setActualizar}
          data={data}
          setData={setIngestaUsuarios}
          rutaFull="api/ingesta/escalamientos"
          rutaID="api/ingesta/escalamiento"
          carpetaBucket="Escalamiento"
          tabla="ESCALAMIENTO"
          layout={dato}
        />
      </div>
    </Main>
  );
};
// export const getServerSideProps = async (ctx) => {
export const getServerSideProps = async () => {
  // const session = await getSession(ctx);
  let data = [];
  let dato = [];
  let error = false;

  try {
    const res = await fetch(`${config.url.API_URL}/api/ingesta/escalamientos/`);
    const res2 = await fetch(
      `${config.url.API_URL}/api/administracion/parametros/lay_archivo/?tabla=ESCALAMIENTO/`
    );
    data = await res.json();
    dato = await res2.json();
  } catch {
    error = true;
  }

  return {
    // ...comprobarPermisos(session, 'Key user'),
    ...{
      props: {
        data,
        dato,
        error,
      },
    },
  };
};

Escalamiento.auth = true;
Escalamiento.roles = ['Key user'];

export default Escalamiento;
