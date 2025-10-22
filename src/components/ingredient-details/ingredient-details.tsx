import { FC } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { IngredientDetailsUI } from '@ui';

export const IngredientDetails: FC = () => {
  const location = useLocation();

  const { id } = useParams<{ id: string }>();
  const isModal = location.state?.background;
  const { data: ingredients, loading } = useSelector(
    (state) => state.ingredients
  );

  const ingredientData = ingredients.find((item) => item._id === id);

  if (loading) {
    return <Preloader />;
  }

  if (!loading && !ingredientData) {
    return (
      <div className='text text_type_main-default p-10'>
        Ингредиент не найден
      </div>
    );
  }

  if (!isModal) {
    return (
      <div>
        <h1
          className='text text_type_main-large mt-10 mb-5'
          style={{ textAlign: 'center' }}
        >
          Детали ингредиента
        </h1>
        <IngredientDetailsUI ingredientData={ingredientData!} />
      </div>
    );
  }

  return <IngredientDetailsUI ingredientData={ingredientData!} />;
};
