import Main from '@/templates/Main';
// import comprobarPermisos from '@/utils/comprobarPermisos';
// import { getSession } from 'next-auth/react';

const EvaluacionDeProveedores = () => {
  return (
    <Main>
      <iframe
        className="w-full h-screen"
        // src="https://lookerstudio.google.com/embed/reporting/35a8199e-7c3c-4ced-8a60-0f227b5700ce"
        src="https://lookerstudio.google.com/embed/reporting/91f738d8-fc73-4dcd-8496-bbb2b6f16532"
      ></iframe>
    </Main>
  );
};

EvaluacionDeProveedores.auth = true;
EvaluacionDeProveedores.roles = ['Key user', 'Analista'];

// export const getServerSideProps = async (ctx) => {
//   const session = await getSession(ctx);
//   return comprobarPermisos(session, 'Key user');
// };

export default EvaluacionDeProveedores;
