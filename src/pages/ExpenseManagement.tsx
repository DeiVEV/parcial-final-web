import { Card } from 'flowbite-react';
import useAuth from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getIncomes } from 'utils/incomes';

import { BarChart } from '@mui/x-charts/BarChart';
import type { Income } from '@~types/common';

const types = ['Pasivo', 'Activo', 'Patrimonio', 'Corriente', 'Capital'];

const ExpenseManagement: React.FC = () => {
  const { user } = useAuth();
  if (!user) return null;

  const navigate = useNavigate();

  const storedIncomes = getIncomes(user.id);

  const [incomes, setIncomes] = useState<Income[]>([]);
  const [egress, setEgress] = useState<Income[]>([]);
  const [incomesAmount, setIncomesAmount] = useState<number[]>([0, 0, 0, 0, 0]);
  const [egressAmount, setEgressAmount] = useState<number[]>([0, 0, 0, 0, 0]);

  const getTypesAmounts = (incomes: Income[], egress: Income[]) => {
    const incomesAmount = incomes.reduce(
      (acc, income) => {
        const index = types.indexOf(income.incomeType);
        if (index !== -1) {
          acc[index] = acc[index] + 1;
        }
        return acc;
      },
      [0, 0, 0, 0, 0],
    );

    const egressAmount = egress.reduce(
      (acc, income) => {
        const index = types.indexOf(income.incomeType);
        if (index !== -1) {
          acc[index] = acc[index] + 1;
        }
        return acc;
      },
      [0, 0, 0, 0, 0],
    );

    return { incomesAmount, egressAmount };
  };

  useEffect(() => {
    if (user?.rol !== 'admin') {
      navigate('/home');
    }

    const incomes = storedIncomes.filter((income) => income.type === 'ingreso');
    const egress = storedIncomes.filter((income) => income.type === 'egreso');
    const { incomesAmount, egressAmount } = getTypesAmounts(incomes, egress);
    setIncomes(incomes);
    setEgress(egress);
    setIncomesAmount(incomesAmount);
    setEgressAmount(egressAmount);
  }, [user, navigate]);

  return (
    <main className='container mx-auto grid flex-grow grid-cols-1 gap-4 p-4 lg:grid-cols-2'>
      <h1 className='col-span-full text-center text-4xl font-bold'>Gestión de gastos</h1>
      <Card>
        <h2 className='text-center text-2xl font-bold'>
          Ingresos: <span className='text-green-500'>{incomes.length}</span>
        </h2>
        <BarChart
          barLabel='value'
          title='Ingresos'
          desc='Cantidad de ingresos por tipo'
          xAxis={[{ scaleType: 'band', data: types }]}
          series={[{ data: incomesAmount }]}
          grid={{ horizontal: true }}
          className='dark:bg-white'
        />
      </Card>
      <Card>
        <h2 className='text-center text-2xl font-bold'>
          Egresos: <span className='text-red-500'>{egress.length}</span>
        </h2>
        <BarChart
          barLabel='value'
          title='Egresos'
          desc='Cantidad de egresos por tipo'
          xAxis={[{ scaleType: 'band', data: types }]}
          series={[{ data: egressAmount }]}
          grid={{ horizontal: true }}
          className='dark:bg-white'
        />
      </Card>
    </main>
  );
};

export default ExpenseManagement;
