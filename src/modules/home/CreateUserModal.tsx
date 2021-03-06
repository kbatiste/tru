/* tslint:disable */ //toavoid 'unnecessary-semicolon' errors

import * as React from 'react';
import {
  Modal,
  withStyles,
  Theme,
  StyledComponentProps,
  withTheme,
  Button,
  WithTheme,
  WithStyles,
  TextField,
  MenuItem,
  InputLabel,
  Input,
  Checkbox,
  ListItemText,
  InputAdornment,
  IconButton,
  Select,
  Grid,
  Paper,
  FormControl,
  Typography
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
let zipcodes = require('zipcodes');
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import * as PropTypes from 'prop-types';

interface StateProps {}

interface DispatchProps {}

interface InternalState {}

// www.npmjs.com/package/zipcodes - to convert zipcode to city and state
const styles = (theme: Theme): { [key: string]: CSSProperties } => ({
  paperModal: {
    position: 'absolute',
    width: '50%',
    backgroundColor: 'none',
    borderRadius: '5%',
    textAlign: 'center',
    margin: '5% 30%'
  },
  paper: {
    textAlign: 'center',
    color: '#2E4C63',
    boxShadow: 'none',
    borderRadius: 0,
    backgroundColor: 'transparent'
  },
  root: {
    flexGrow: 1,
    backgroundColor: '#E8E8E8',
    borderRadius: 10,
    padding: '0 20px'
  },
  table: {
    minWidth: '100%'
  },
  tableCell: {
    border: 'none'
  },
  label: {
    textAlign: 'center',
    fontSize: '2em'
  },
  submitBtn: {
    width: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 20
  },
  wrapText: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
    whiteSpace: 'normal'
  },
  menu: {
    width: 200
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 400
  },
  orangeSpan: {
    color: '#F17820',
    fontSize: '1em'
  },
  errorSpan: {
    color: 'red',
    fontSize: '1em'
  },
  formDiv: {
    width: '100%',
    backgroundColor: 'yellow'
  }
});

type PropsWithStyles = StateProps &
  DispatchProps &
  WithTheme &
  WithStyles<
    | 'button'
    | 'paper'
    | 'paperModal'
    | 'root'
    | 'tableCell'
    | 'table'
    | 'label'
    | 'submitBtn'
    | 'wrapText'
    | 'menu'
    | 'formControl'
    | 'personalizedModal'
    | 'orangeSpan'
    | 'errorSpan'
    | 'margin'
    | 'formDiv'
    | 'bgColorModal'
  >;

const gender = ['Male', 'Female', 'Other'];
const causes = [
  'Animal Welfare',
  'Arts and Culture',
  'Children',
  'Civil Rights and Social Action',
  'Disaster and Humanitarian Relief',
  'Economic Empowerment',
  'Education',
  'Environment',
  'Health',
  'Human Rights',
  'Politics',
  'Poverty Alleviation',
  'Science and Technology',
  'Social Services'
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

class CreateModal extends React.PureComponent<PropsWithStyles, InternalState> {
  cause: Array<string> = [];
  state = {
    open: false,
    defaultState: '',
    firstName: '',
    lastName: '',
    gender: '',
    cause: this.cause,
    zipcode: '',
    cs: '',
    city: '',
    state: '',
    phoneNumber: '',
    email: '',
    password: '',
    showPassword: false,
    passCheck: '',
    errStack: '',
    unformattedPhoneNumber: ''
  };
  unique = 1;

  propTypes = {
    classes: PropTypes.object.isRequired
  };

  handleOpenModal = () => {
    this.setState({ open: true });
  };

  handleCloseModal = () => {
    this.setState({ open: false });
  };

  handleCauseChange = (event: any) => {
    this.setState({ cause: event.target.value });
  };

  handleZipcodeChange = (event: any) => {
    const onlyNums = event.target.value.replace(/[^0-9]/, '');
    console.log('Onlynums:', onlyNums);
    if (onlyNums.length < 5) {
      this.setState({ zipcode: onlyNums });
    } else if (onlyNums.length === 5) {
      this.setState({ zipcode: onlyNums });
      this.findCityState(onlyNums);
    }
  };

  findCityState = (nums: number) => {
    if (zipcodes.lookup(nums) !== undefined) {
      let city = zipcodes.lookup(nums).city;
      let state = zipcodes.lookup(nums).state;
      let cs = `${city}, ${state}`;
      this.setState({ cs: cs, city: city, state: state });
    } else {
      alert('Incorrect zipcode! Try again.');
    }
  };

  handleNumberChange = (e: any) => {
    const onlyNums = e.target.value.replace(/[^0-9]/, '');
    if (onlyNums.length < 10) {
      this.setState({ phoneNumber: onlyNums });
    } else if (onlyNums.length === 10) {
      this.setState({ unformattedPhoneNumber: onlyNums });
      const number = onlyNums.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
      this.setState({ phoneNumber: number });
    }
  };

  handleEmailChange = (event: any) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event: any) => {
    this.setState({ password: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleFirstName = (e: any) => {
    this.setState({ firstName: e.target.value });
  };
  handleLastName = (e: any) => {
    this.setState({ lastName: e.target.value });
  };
  handleGenderChange = (e: any) => {
    this.setState({ gender: e.target.value });
  };

  errStack = '';
  validateEmail = () => {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(this.state.email) === false) {
      this.errStack = 'Invalid Email';
      this.setState({ errStack: this.errStack });
    } else {
      this.errStack = '';
      this.setState({ errStack: this.errStack });
    }
  };

  createUserObj = () => {
    return new Promise((resolve, reject) => {
      let userObj = {
        fname: this.state.firstName,
        lname: this.state.lastName,
        gender: this.state.gender,
        causes: this.state.cause,
        zipcode: this.state.zipcode,
        city: this.state.city,
        state: this.state.state,
        email: this.state.email,
        password: this.state.password,
        phoneNumber: this.state.unformattedPhoneNumber
      };
      resolve(userObj);
    });
  };

  onFormSubmit = () => {
    if (this.state.errStack.length > 0) {
      this.setState({ errStack: this.state.errStack });
    } else {
      this.createUserObj().then(data => {
        localStorage.setItem('UserObj', JSON.stringify(data)); //TODO: change it to actual database once ready
      });
    }
  };

  resetForm = () => {
    this.handleCloseModal();
    this.setState({
      firstName: '',
      lastName: '',
      gender: '',
      cause: this.cause,
      zipcode: '',
      cs: '',
      city: '',
      state: '',
      phoneNumber: '',
      email: '',
      password: '',
      showPassword: false,
      passCheck: '',
      errStack: '',
      unformattedPhoneNumber: ''
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button color="primary" onClick={this.handleOpenModal} aria-label="Register" className={classes.button}>
          Register
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleCloseModal}
          className={classes.paperModal}
        >
          <div className={classes.root}>
            <form onSubmit={this.onFormSubmit}>
              <Grid container spacing={16}>
                <Grid item xs={12}>
                  <Typography variant="h6" className={classes.paper}>
                    Sign up to enjoy what <span className={classes.orangeSpan}>tru</span>
                    Radius has to offer.
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    required
                    id="standard-fname"
                    label="First Name"
                    value={this.state.firstName}
                    onChange={this.handleFirstName}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    required
                    id="standard-lname"
                    label="Last Name"
                    value={this.state.lastName}
                    onChange={this.handleLastName}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="standard-select-gender"
                    select
                    label="Gender"
                    value={this.state.gender}
                    onChange={this.handleGenderChange}
                    SelectProps={{ MenuProps: { className: classes.menu } }}
                    margin="normal"
                  >
                    {gender.map(g => (
                      <MenuItem key={g} value={g}>
                        {g}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <FormControl style={{ width: '100%', marginTop: 16 }}>
                    <InputLabel htmlFor="select-multiple-checkbox">Select causes</InputLabel>
                    <Select
                      autoWidth
                      required
                      multiple
                      value={this.state.cause}
                      onChange={this.handleCauseChange}
                      input={<Input multiline id="select-multiple-checkbox" />}
                      renderValue={() => this.state.cause.join(', ')}
                      MenuProps={MenuProps}
                    >
                      {causes.map(c => (
                        <MenuItem key={this.unique++} value={c}>
                          <Checkbox checked={this.state.cause.indexOf(c) > -1} />
                          <ListItemText primary={c} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    required
                    id="standard-zipcode"
                    label="Zipcode"
                    value={this.state.zipcode}
                    onChange={this.handleZipcodeChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    disabled
                    id="standard-city"
                    label="City"
                    value={this.state.city}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    disabled
                    id="standard-state"
                    label="State"
                    value={this.state.state}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="standard-number"
                    label="Phone Number"
                    value={this.state.phoneNumber}
                    onChange={this.handleNumberChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    required
                    onBlur={this.validateEmail}
                    id="standard-email"
                    label="Email"
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                    margin="normal"
                    helperText={<span className={classes.errorSpan}>{this.state.errStack}</span>}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl style={{ width: '100%', marginTop: 16 }}>
                    <InputLabel htmlFor="adornment-password">Password</InputLabel>
                    <Input
                      fullWidth
                      required
                      id="adornment-password"
                      type={this.state.showPassword ? 'text' : 'password'}
                      value={this.state.password}
                      onChange={this.handlePasswordChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton aria-label="Toggle password visibility" onClick={this.handleClickShowPassword}>
                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    <Button color="primary" className={classes.button} type="button" onClick={this.resetForm}>
                      Cancel
                    </Button>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}>
                    <Button color="primary" className={classes.button} type="submit">
                      Submit
                    </Button>
                  </Paper>
                </Grid>
              </Grid>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

type StyledProps = StateProps & DispatchProps & StyledComponentProps<string>;
export const CreateUserModal: React.ComponentType<StyledProps> = withTheme()(withStyles(styles)(CreateModal));
export default CreateUserModal;
