import { BigQuery } from '@google-cloud/bigquery';
import NextCors from 'nextjs-cors';
import corsOptions from '@/utils/corsOptions';

const bigquery = new BigQuery();

export default async function handler(req, res) {
  await NextCors(req, res, corsOptions);
  if (req.method === 'GET') {
    const query = `SELECT ORDEN, ID_PROVEEDOR, NOMBRE_PROVEEDOR, TOTAL, UNIDAD, CONVERSION, TIPO_CONVERSION FROM vw-vwm-bi-anagp-p-evalpro-l44.STG_${process.env.AMBIENTE_PROD}.TB_CALCULO_CAMBIO WHERE SISTEMA = "${process.env.NEXT_PUBLIC_SISTEMA}" ORDER BY ORDEN DESC`;
    const options = {
      query,
      location: 'EU',
    };
    const [job] = await bigquery.createQueryJob(options);
    const [rows] = await job.getQueryResults();
    res.status(200).json(rows);
  }
}
