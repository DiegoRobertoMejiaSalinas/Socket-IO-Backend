import { CreateStockUsecase } from '../application/usecases/create-stock.usecase';
import { DeleteStockUsecase } from '../application/usecases/delete-stock.usecase';
import { GetStockByIdUsecase } from '../application/usecases/get-stock-by-id.usecase';
import { ListStocksUsecase } from '../application/usecases/list-stocks.usecase';
import { UpdateStockUsecase } from '../application/usecases/update-stock.usecase';

export const StockProviders = [
  DeleteStockUsecase,
  CreateStockUsecase,
  UpdateStockUsecase,
  GetStockByIdUsecase,
  ListStocksUsecase,
];
