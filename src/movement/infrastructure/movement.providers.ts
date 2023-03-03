import { CreateMovementUsecase } from '../application/usecases/create-movement.usecase';
import { ListMovementsByStockIdUsecase } from '../application/usecases/list-movements-by-stock-id.usecase';

export const MovementProviders = [
  CreateMovementUsecase,
  ListMovementsByStockIdUsecase,
];
