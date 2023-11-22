import { Helmet } from 'react-helmet-async';
import { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
// components
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useNavigate } from 'react-router-dom';
import { Textfield } from '../utils/formLib';
import { useSnackbar } from '../utils/CommonSnack';
import { ProductSort, ProductFilterSidebar } from '../sections/@dashboard/products';
import { fetchProducts } from '../slices/product';
import { getUserDetails, makeColumn, makePayload } from '../utils/utility';
import MuiTable from '../components/table/Table';
import GenericDialog from '../components/Dialog';
import Fields from '../components/Field';
import { IsLoadingHOC } from '../utils/hoc/loader';
import http from '../utils/http-common';
import productField from '../utils/fieldsJson/productJson.json';
// ----------------------------------------------------------------------

function ProductsPage(props) {
  const { setLoading } = props;
  const navigate = useNavigate();
  const [openFilter, setOpenFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [category, setcategory] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openAttribute, setOpenAttribute] = useState(false);
  const [attributeData, setAttributeData] = useState({});

  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();
  let initialValues = {};
  productField.fields.forEach((field) => {
    initialValues[field.name] = field.type === 'multiselect' ? [] : '';
  });
  initialValues = {
    ...initialValues,
    categories: [],
  };
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      ...initialValues,
    },
  });
  const initialValuesAttribute = {
    attributes: {
      title: {
        name: '',
        options: '',
      },
    },
  };
  const {
    handleSubmit: handleSubmitAttribute,
    reset: resetAttribute,
    control: controlAttribute,
    formState: { errors: errorsAttribute },
    getValues: getValuesAttribute,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      ...initialValuesAttribute,
    },
  });
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const getProducts = () => {
    const payload = {
      storeId: getUserDetails().storeid,
    };
    dispatch(fetchProducts(payload))
      .unwrap()
      .then((data) => {
        setProducts([...data.data]);
      })
      .catch((e) => {
        console.log(e);
        showSnackbar(e.message, 'error');
      });
  };

  useEffect(() => {
    getProducts();
    getCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const col = makeColumn(products);
  const data = products;
  const handleAdd = () => {
    setShowForm(true);
    setIsEdit(false);
    reset(initialValues);
    resetAttribute(initialValuesAttribute);
  };
  const actions = ({ row }) => (
    <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
      <IconButton
        color="secondary"
        onClick={() => {
          handleEdit(row.original);
        }}
      >
        <EditIcon />
      </IconButton>
    </Box>
  );
  const handleEdit = (data) => {
    setIsEdit(true);
    reset(data);
    setShowForm(true);
  };
  const getCategory = async () => {
    setLoading(true);
    try {
      const payload = makePayload('category', 'SELECT', [], 'AND');
      const response = await http.post('/crud/categories', payload);
      if (response.data.status === 200) {
        setLoading(false);
        setcategory([...response.data.data]);
      } else {
        setLoading(false);
        setcategory([]);
        showSnackbar(response.data.message, 'error');
      }
    } catch (error) {
      setcategory([]);
      setLoading(false);
      console.error('API Error:', error);
      showSnackbar(error.message, 'error');
    }
  };
  const onSubmit = async (data) => {
    console.log(getValuesAttribute());
    return Promise.resolve();
    // setLoading(true);
    // const payload = { ...data, storeId: getUserDetails().storeid };
    // try {
    //   const response = await http.post('', payload);
    //   if (response.data.status === 200) {
    //     setLoading(false);
    //     showSnackbar(`Product created successfully`, 'success');
    //     reset(initialValues);
    //     setIsEdit(false);
    //     setShowForm(false);
    //     getProducts();
    //     return response.data.data;
    //   }
    //   setLoading(false);
    //   showSnackbar(response.data.message, 'error');
    //   return Promise.resolve();
    // } catch (error) {
    //   setLoading(false);
    //   console.error('API Error:', error);
    //   showSnackbar(error.message, 'error');
    //   return Promise.reject();
    // }
  };
  function calculateOptions(variable) {
    switch (variable) {
      case 'category':
        return category.map((e) => ({
          label: e.category_name,
          value: String(e.category_id),
        }));
      default:
        return [];
    }
  }
  const onSubmitAttribute = async (data) => {
    const attributeLength = Object.keys(attributeData).length + 1;
    setAttributeData({
      ...attributeData,
      [`attribute ${attributeLength}`]: data,
    });
    setOpenAttribute(false);
    resetAttribute(initialValuesAttribute);
  };
  function generateCombinations(attributeData) {
    const combinations = [];

    // Generate combinations for each attribute
    Object.values(attributeData).forEach((attribute) => {
      const title = attribute.attributes.title.name;
      const options = attribute.attributes.title.options.split(',');
      const attributeCombinations = options.map((option) => `${title} - ${option}`);
      combinations.push(attributeCombinations);
    });

    // Combine combinations when there are multiple attributes
    let resultCombinations = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < combinations.length; i++) {
      const current = combinations[i];

      if (resultCombinations.length === 0) {
        resultCombinations = current;
      } else {
        const combined = [];
        // eslint-disable-next-line no-plusplus
        for (let j = 0; j < resultCombinations.length; j++) {
          // eslint-disable-next-line no-plusplus
          for (let k = 0; k < current.length; k++) {
            combined.push(`${resultCombinations[j]}, ${current[k]}`);
          }
        }
        resultCombinations = combined;
      }
    }

    return resultCombinations;
  }
  const combinations = generateCombinations(attributeData);

  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Etagers </title>
      </Helmet>
      {!showForm ? (
        <Container>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Products
          </Typography>

          <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
            <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
              <ProductFilterSidebar
                openFilter={openFilter}
                onOpenFilter={handleOpenFilter}
                onCloseFilter={handleCloseFilter}
              />
              <ProductSort />
            </Stack>
          </Stack>
          <MuiTable columns={col} data={data} add handleAdd={handleAdd} actions={actions} />
        </Container>
      ) : (
        <Container>
          <Typography variant="h4" sx={{ mb: 5 }}>
            {isEdit ? 'Update' : 'Add'} Product
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {productField.fields.map((field, i) => (
                <Grid xs={field.xs} sm={field.sm} item key={field.name}>
                  <Fields
                    index={i}
                    value={field.value}
                    fields={
                      field.isOptionVariable
                        ? {
                            ...field,
                            options: calculateOptions(field.optionsVariable),
                          }
                        : field
                    }
                    formControl={{
                      control,
                      errors,
                    }}
                  />
                </Grid>
              ))}
              <Grid xs={12} sm={12} item>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography>Add Attribute </Typography>
                  </Grid>
                  <Grid item>
                    &nbsp;{' '}
                    <AddBoxIcon
                      onClick={() => {
                        if (Object.keys(attributeData).length >= 3) {
                          showSnackbar('Not allowed to add more that 3', 'error');
                          return;
                        }
                        setOpenAttribute(true);
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {Object.keys(attributeData).length > 0 && (
                <>
                  <Grid xs={12} sm={12} item>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Options</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.entries(attributeData).map(([attributeKey, attributeValue]) => (
                            <TableRow key={attributeKey}>
                              <TableCell>{attributeValue.attributes.title.name}</TableCell>
                              <TableCell>{attributeValue.attributes.title.options}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <Grid xs={12} sm={12} item>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Options</TableCell>
                            <TableCell align="center" style={{ maxWidth: '150px' }}>
                              Quantity
                            </TableCell>
                            <TableCell align="center" style={{ maxWidth: '150px' }}>
                              Selling Price
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {combinations.map((combination) => (
                            <TableRow key={combination}>
                              <TableCell>{combination}</TableCell>
                              <TableCell align="center">
                                <Controller
                                  name={`attributes.quantity - ${combination}`}
                                  control={controlAttribute}
                                  render={({ field }) => (
                                    <Textfield
                                      {...field}
                                      label={'Quantity'}
                                      variant={'outlined'}
                                      onChange={(e) => {
                                        field.onChange(e);
                                      }}
                                    />
                                  )}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <Controller
                                  name={`attributes.sellingPrice - ${combination}`}
                                  control={controlAttribute}
                                  render={({ field }) => (
                                    <Textfield
                                      {...field}
                                      label={'Selling Price'}
                                      variant={'outlined'}
                                      onChange={(e) => {
                                        field.onChange(e);
                                      }}
                                    />
                                  )}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </>
              )}
            </Grid>
          </form>
          <GenericDialog
            open={openAttribute}
            title={`Add Attribute`}
            onClose={() => {
              setOpenAttribute(false);
            }}
            maxWidth={'sm'}
            onSubmit={handleSubmitAttribute(onSubmitAttribute)}
            buttonText={'Submit'}
            content={
              <form onSubmit={handleSubmitAttribute(onSubmitAttribute)}>
                <Grid container spacing={2}>
                  <Grid xs={12} sm={4} item>
                    <Controller
                      name={'attributes.title.name'}
                      control={controlAttribute}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Textfield
                          {...field}
                          label={'Title'}
                          variant={'outlined'}
                          error={!!errorsAttribute?.attributes?.title?.name}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                          helperText={
                            errorsAttribute?.attributes?.title?.name
                              ? errorsAttribute?.attributes?.title?.name?.type === 'required'
                                ? 'This field is required'
                                : errorsAttribute?.attributes?.title?.name?.message
                              : ''
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid xs={12} sm={8} item>
                    <Controller
                      name={'attributes.title.options'}
                      control={controlAttribute}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Textfield
                          {...field}
                          label={'Title Options'}
                          variant={'outlined'}
                          error={!!errorsAttribute?.attributes?.title?.options}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                          helperText={`${
                            errorsAttribute?.attributes?.title?.options
                              ? errorsAttribute?.attributes?.title?.options?.type === 'required'
                                ? 'This field is required'
                                : errorsAttribute?.attributes?.title?.options?.message
                              : ''
                          } Please give as comma separated`}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </form>
            }
          />
          <Grid container spacing={2}>
            <Grid item xs={12} container justifyContent="center">
              <Button variant="contained" style={{ marginRight: 10 }} onClick={handleSubmit(onSubmit)}>
                Save
              </Button>
              <Button
                onClick={() => {
                  setShowForm(false);
                }}
                variant="outlined"
                color="inherit"
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
}
ProductsPage.propTypes = {
  setLoading: PropTypes.func.isRequired,
};
export default IsLoadingHOC(ProductsPage, 'Loading....');
