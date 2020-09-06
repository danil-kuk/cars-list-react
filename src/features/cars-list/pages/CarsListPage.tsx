import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { Box, Button } from '@material-ui/core';
import { SortOrder } from 'src/types';
import { carService } from 'src/services/api';
import { DataTable } from 'src/components/DataTable';
import { EditorDialog } from 'src/components/EditorDialog';
import { Car, User } from 'src/models';
import { carMapper } from 'src/services/mappers';
import { RootState } from 'src/store';
import { isUserAdmin } from 'src/utils';

import { headers } from '../utils/headers';
import { formControls } from '../utils/controls';

interface Props {
  /**
   * Current user.
   */
  user: User | null;
}

/**
 * Cars list page.
 */
const CarsListPage: React.FC<Props> = (props) => {
  const { user } = props;
  /**
   * Cars data.
   */
  const [carsData, setCarsData] = useState<Car[]>([]);

  /**
   * Car editor dialog state.
   */
  const [open, setOpen] = useState(false);

  /**
   * Car selected for edit.
   */
  const [editedCar, setEditedCar] = useState<Car | null>();

  /**
   * Data sort order.
   */
  const [order, setOrder] = useState<SortOrder>('asc');

  /**
   * Field to order data by.
   */
  const [orderBy, setOrderBy] = useState<keyof Car>('id');

  /**
   * Get cars data from database to display in table.
   */
  useEffect(() => carService.getAllCars(setCarsData, orderBy, order), [order, orderBy]);

  /**
   * Is current user admin.
   */
  const isAdmin = useMemo(() => isUserAdmin(user), [user]);

  /**
   * Handle sort order and field changes.
   * @param order Sort order.
   * @param field Field to sort by.
   */
  const handleSortChange = (order: SortOrder, field: keyof Car) => {
    setOrder(order);
    setOrderBy(field);
  };

  /**
   * Handle car edit action.
   * @param item Car to edit.
   */
  const handleItemEdit = (item: Car) => {
    setOpen(true);
    setEditedCar(item);
  };

  /**
   * Handle editor form close.
   * @param editedItem Item in editor form
   */
  const handleClose = (editedItem?: Record<keyof Car, unknown>) => {
    if (editedItem) {
      const dto = carMapper.toDto(editedItem as Car);

      carService.saveCarToDatabase(dto);
    }
    setOpen(false);
    setEditedCar(null);
  };

  return (
    <>
      <h1>Cars list page</h1>
      <DataTable
        data={carsData}
        headers={headers}
        onItemDelete={isAdmin === true ? carService.delteCarFromDatabase : undefined}
        onItemEdit={isAdmin === true ? handleItemEdit : undefined}
        onSortChange={handleSortChange}
      />
      <EditorDialog
        open={open}
        propItem={editedCar}
        controls={formControls}
        onClose={handleClose}
      />
      <Box
        display="flex"
        justifyContent="center"
        marginTop={2}
      >
        <Button onClick={() => setOpen(true)}>Add new</Button>
      </Box>
    </>
  );
};

const mapStateToProps = ({ auth }: RootState) => ({ user: auth.user });

export default connect(mapStateToProps)(CarsListPage);

