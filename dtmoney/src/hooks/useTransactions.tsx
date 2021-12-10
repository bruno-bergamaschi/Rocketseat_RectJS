import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import { api } from '../services/api';

interface ITransaction {
	id: number;
	title: string;
	amount: number;
	type: string;
	category: string;
	createdAt: string;
}

// Para criar uma nova interface a ser passada em createTransaction
// temos 2 opções:

// Criar uma nova interface:

// interface ITransactionInput {
// 	title: string;
// 	amount: number;
// 	type: string;
// 	category: string;
// }

//Copiar uma interface existente, com 2 opções:

// Irá copiar o ITransaction, desconsiderando os campos 'id' | 'createdAt'
type ITransactionInput = Omit<ITransaction, 'id' | 'createdAt'>;

// Irá copiar o ITransaction, selecionando apenas 'title' | 'amount' | 'type' | 'category'
// type ITransactionInput = Pick<
// 	ITransaction,
// 	'title' | 'amount' | 'type' | 'category'
// >;

interface ITransactionsProvidersProps {
	children: ReactNode;
}

interface ITransactionsContextData {
	transactions: ITransaction[];
	createTransaction: (transaction: ITransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<ITransactionsContextData>(
	// Esse valor deverá ser passado como as ITransactionsContextData, pois o typescript
	// não aceita apenas objeto {}, nesse caso forçamos um reconhecimento
	{} as ITransactionsContextData
);

export function TransactionsProvider({
	children,
}: ITransactionsProvidersProps) {
	const [transactions, setTransactions] = useState<ITransaction[]>([]);

	useEffect(() => {
		api.get('transactions').then((response) => {
			setTransactions(response.data);
		});
	}, []);

	async function createTransaction(transactionInput: ITransactionInput) {
		const response = await api.post('/transactions', {
			...transactionInput,
			createdAt: new Date(),
		});
		const { transaction } = response.data;

		setTransactions([...transactions, transaction]);
	}

	return (
		<TransactionsContext.Provider value={{ transactions, createTransaction }}>
			{children}
		</TransactionsContext.Provider>
	);
}

export function useTransactions() {
	const context = useContext(TransactionsContext);

	return context;
}
