import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
  Box,
  Typography,
  TextField,
  styled,
  Grid,
  Card,
  CardContent,
  TableContainer, // Add this import
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  TextareaAutosize,
  Avatar,
  Divider,
  LinearProgress,
  Badge,
} from "@mui/material";
import {
  AccountBalance as AccountBalanceIcon,
  QrCode as QrCodeIcon,
  Description as DescriptionIcon,
  Image as ImageIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  DoneAll as DoneAllIcon,
  Add as AddIcon,
  Refresh as RefreshIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  Info as InfoIcon,
  Task as TaskIcon,
  Verified as VerifiedIcon,
} from "@mui/icons-material";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useTheme } from "../../../ThemeContext";
import { getUserData } from "../../Auth";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
    transform: "scale(1.01)",
    transition: "all 0.2s ease-in-out",
  },
}));

const StatusChip = styled(Chip)(({ status }) => ({
  fontWeight: "bold",
  backgroundColor:
    status === "Pending"
      ? "#ff9800"
      : status === "Done"
      ? "#4caf50"
      : "#2196f3",
  color: "white",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
}));

const CommentTextarea = styled(TextareaAutosize)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  marginTop: theme.spacing(2),
  fontSize: "0.875rem",
  fontFamily: theme.typography.fontFamily,
  "&:focus": {
    outline: "none",
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
  },
}));

const DetailCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  boxShadow: "0 4px 20px 0 rgba(0,0,0,0.08)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 24px 0 rgba(0,0,0,0.12)",
  },
}));

function ComplainOptions({ open, onClose }) {
  const [tabValue, setTabValue] = useState(0);
  const [pendingTickets, setPendingTickets] = useState([]);
  const [doneTickets, setDoneTickets] = useState([]);
  const [confirmTickets, setConfirmTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [remarks, setRemarks] = useState("");
  const { apiLinks } = useTheme();
  const [loading, setLoading] = useState(false);
  const user = getUserData();

  const [newTicketForm, setNewTicketForm] = useState({
    FMenTyp: "",
    FMenDsc: "",
    FCmpRem: "",
    FMobNum: "",
    FEmlAdd: "",
  });
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setSelectedTicket(null);
  };

  const fetchPendingTickets = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiLinks}/GetPendingTickets.php`);
      setPendingTickets(response.data);
      setLoading(false);
    } catch (error) {
      enqueueSnackbar("Failed to fetch pending tickets", { variant: "error" });
      setLoading(false);
    }
  };

  const fetchDoneTickets = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiLinks}/GetDoneTickets.php`);
      setDoneTickets(response.data);
      setLoading(false);
    } catch (error) {
      enqueueSnackbar("Failed to fetch done tickets", { variant: "error" });
      setLoading(false);
    }
  };

  const fetchConfirmTickets = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiLinks}/GetConfirmTickets.php`);
      setConfirmTickets(response.data);
      setLoading(false);
    } catch (error) {
      enqueueSnackbar("Failed to fetch confirmed tickets", {
        variant: "error",
      });
      setLoading(false);
    }
  };

  const handleSubmitNewTicket = async () => {
    try {
      setLoading(true);
      await axios.post(`${apiLinks}/SaveTicket.php`, newTicketForm);
      enqueueSnackbar("Ticket created successfully!", { variant: "success" });
      setShowNewTicketForm(false);
      setNewTicketForm({
        FMenTyp: "",
        FMenDsc: "",
        FCmpRem: "",
        FMobNum: "",
        FEmlAdd: "",
      });
      await fetchPendingTickets();
      setLoading(false);
    } catch (error) {
      enqueueSnackbar("Failed to create ticket", { variant: "error" });
      setLoading(false);
    }
  };

  const handleMarkAsDone = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      id: selectedTicket.id,
      FDonRem: remarks,
      FUsrId: user.tusrid,
      FEmlAdd: user.temladd,
    };

    const formData = new URLSearchParams(data).toString();

    try {
      const response = await axios.post(
        `${apiLinks}/SaveTicketDone.php`,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const { error, message } = response.data;
      if (error === 200) {
        enqueueSnackbar("Ticket marked as done!", { variant: "success" });
        setSelectedTicket(null);
        setRemarks("");
        await fetchPendingTickets();
        await fetchDoneTickets();
      }
      setLoading(false);
    } catch (error) {
      enqueueSnackbar("Failed to mark ticket as done", { variant: "error" });
      setLoading(false);
    }
  };

  const handleConfirmTicket = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      id: selectedTicket.id,
      FCnfRem: remarks,
      FUsrId: user.tusrid,
      FEmlAdd: user.temladd,
    };

    const formData = new URLSearchParams(data).toString();

    try {
      const response = await axios.post(
        `${apiLinks}/SaveTicketConfirm.php`,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const { error, message } = response.data;
      if (error === 200) {
        enqueueSnackbar("Ticket confirmed!", { variant: "success" });
        setSelectedTicket(null);
        setRemarks("");
        await fetchDoneTickets();
        await fetchConfirmTickets();
      }
      setLoading(false);
    } catch (error) {
      enqueueSnackbar("Failed to confirm ticket", { variant: "error" });
      setLoading(false);
    }
  };

  const refreshAll = async () => {
    setLoading(true);
    await Promise.all([
      fetchPendingTickets(),
      fetchDoneTickets(),
      fetchConfirmTickets(),
    ]);
    setLoading(false);
  };

  useEffect(() => {
    if (open) {
      refreshAll();
    }
  }, [open]);

  // Fill empty rows for better table appearance
  const fillEmptyRows = (data) => {
    const emptyRows = 6 - data.length;
    if (emptyRows > 0) {
      return Array(emptyRows).fill({ empty: true });
    }
    return [];
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      scroll="paper"
      PaperProps={{
        sx: {
          borderRadius: "12px",
          overflow: "hidden",
        },
      }}
    >
      {loading && <LinearProgress color="primary" />}

      <DialogTitle
        sx={{
          background: "linear-gradient(135deg, #0A2744 0%, #1A3A5F 100%)",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 2,
          px: 3,
        }}
      >
        <Box display="flex" alignItems="center">
          <TaskIcon sx={{ mr: 1.5, fontSize: "1.8rem" }} />
          <Typography variant="h6" fontWeight="600">
            Complaint Management System
          </Typography>
          <IconButton
            onClick={refreshAll}
            color="inherit"
            sx={{ ml: 2 }}
            size="small"
          >
            <RefreshIcon />
          </IconButton>
        </Box>
        <Box>
          {!showNewTicketForm && tabValue === 0 && (
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
              onClick={() => setShowNewTicketForm(true)}
              size="small"
              sx={{ mr: 1, borderRadius: "8px" }}
            >
              New Ticket
            </Button>
          )}
          <IconButton onClick={onClose} color="inherit" size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        {showNewTicketForm ? (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: "#0A2744" }}>
              <AddIcon sx={{ verticalAlign: "middle", mr: 1 }} />
              Create New Support Ticket
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "text.secondary" }}
                >
                  Menu Type *
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter menu type"
                  variant="outlined"
                  size="small"
                  value={newTicketForm.FMenTyp}
                  onChange={(e) =>
                    setNewTicketForm({
                      ...newTicketForm,
                      FMenTyp: e.target.value,
                    })
                  }
                  InputProps={{
                    startAdornment: <InfoIcon color="action" sx={{ mr: 1 }} />,
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "text.secondary" }}
                >
                  Menu Description *
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter menu description"
                  variant="outlined"
                  size="small"
                  value={newTicketForm.FMenDsc}
                  onChange={(e) =>
                    setNewTicketForm({
                      ...newTicketForm,
                      FMenDsc: e.target.value,
                    })
                  }
                  InputProps={{
                    startAdornment: (
                      <DescriptionIcon color="action" sx={{ mr: 1 }} />
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "text.secondary" }}
                >
                  Complaint Details *
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Describe your complaint in detail"
                  multiline
                  rows={4}
                  variant="outlined"
                  value={newTicketForm.FCmpRem}
                  onChange={(e) =>
                    setNewTicketForm({
                      ...newTicketForm,
                      FCmpRem: e.target.value,
                    })
                  }
                  InputProps={{
                    startAdornment: (
                      <DescriptionIcon color="action" sx={{ mr: 1 }} />
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "text.secondary" }}
                >
                  Mobile Number *
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter mobile number"
                  variant="outlined"
                  size="small"
                  value={newTicketForm.FMobNum}
                  onChange={(e) =>
                    setNewTicketForm({
                      ...newTicketForm,
                      FMobNum: e.target.value,
                    })
                  }
                  InputProps={{
                    startAdornment: <PhoneIcon color="action" sx={{ mr: 1 }} />,
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "text.secondary" }}
                >
                  Email Address *
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter email address"
                  variant="outlined"
                  size="small"
                  value={newTicketForm.FEmlAdd}
                  onChange={(e) =>
                    setNewTicketForm({
                      ...newTicketForm,
                      FEmlAdd: e.target.value,
                    })
                  }
                  InputProps={{
                    startAdornment: <EmailIcon color="action" sx={{ mr: 1 }} />,
                  }}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button
                onClick={() => setShowNewTicketForm(false)}
                variant="outlined"
                sx={{ mr: 2, borderRadius: "8px" }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitNewTicket}
                variant="contained"
                color="primary"
                sx={{ borderRadius: "8px" }}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Ticket"}
              </Button>
            </Box>
          </Box>
        ) : selectedTicket ? (
          <Box sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography
                variant="h5"
                sx={{ color: "#0A2744", fontWeight: 600 }}
              >
                <TaskIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                Ticket #{selectedTicket.id}
              </Typography>
              <Box display="flex" alignItems="center">
                <StatusChip
                  label={selectedTicket.tcmpsts}
                  status={selectedTicket.tcmpsts}
                  size="medium"
                  icon={
                    selectedTicket.tcmpsts === "Pending" ? (
                      <InfoIcon style={{ color: "white" }} />
                    ) : selectedTicket.tcmpsts === "Done" ? (
                      <CheckCircleIcon style={{ color: "white" }} />
                    ) : (
                      <VerifiedIcon style={{ color: "white" }} />
                    )
                  }
                />
                <IconButton
                  onClick={() => setSelectedTicket(null)}
                  size="small"
                  sx={{ ml: 1 }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <DetailCard>
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ fontWeight: "bold", color: "#0A2744" }}
                    >
                      <InfoIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                      Basic Information
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    <Box
                      sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                    >
                      <CalendarIcon color="action" sx={{ mr: 1.5 }} />
                      <Typography variant="body2">
                        <strong>Date:</strong> {selectedTicket.tcmpdat}
                      </Typography>
                    </Box>

                    <Box
                      sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                    >
                      <TimeIcon color="action" sx={{ mr: 1.5 }} />
                      <Typography variant="body2">
                        <strong>Time:</strong> {selectedTicket.tcmptim}
                      </Typography>
                    </Box>

                    <Box
                      sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                    >
                      <DescriptionIcon color="action" sx={{ mr: 1.5 }} />
                      <Typography variant="body2">
                        <strong>Menu Type:</strong> {selectedTicket.tmentyp}
                      </Typography>
                    </Box>

                    <Box
                      sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                    >
                      <DescriptionIcon color="action" sx={{ mr: 1.5 }} />
                      <Typography variant="body2">
                        <strong>Description:</strong> {selectedTicket.tmendsc}
                      </Typography>
                    </Box>
                  </CardContent>
                </DetailCard>
              </Grid>

              <Grid item xs={12} md={6}>
                <DetailCard>
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ fontWeight: "bold", color: "#0A2744" }}
                    >
                      <PersonIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                      Contact Information
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    <Box
                      sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                    >
                      <PhoneIcon color="action" sx={{ mr: 1.5 }} />
                      <Typography variant="body2">
                        <strong>Mobile:</strong> {selectedTicket.tmobnum}
                      </Typography>
                    </Box>

                    <Box
                      sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                    >
                      <EmailIcon color="action" sx={{ mr: 1.5 }} />
                      <Typography variant="body2">
                        <strong>Email:</strong> {selectedTicket.temladd}
                      </Typography>
                    </Box>

                    <Box
                      sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                    >
                      <PersonIcon color="action" sx={{ mr: 1.5 }} />
                      <Typography variant="body2">
                        <strong>Reported By:</strong> {selectedTicket.tusrid}
                      </Typography>
                    </Box>

                    <Box
                      sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                    >
                      <InfoIcon color="action" sx={{ mr: 1.5 }} />
                      <Typography variant="body2">
                        <strong>IP Address:</strong> {selectedTicket.tusrip}
                      </Typography>
                    </Box>
                  </CardContent>
                </DetailCard>
              </Grid>

              <Grid item xs={12}>
                <DetailCard>
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ fontWeight: "bold", color: "#0A2744" }}
                    >
                      <DescriptionIcon
                        sx={{ verticalAlign: "middle", mr: 1 }}
                      />
                      Complaint Details
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                      {selectedTicket.tcmprem}
                    </Typography>
                  </CardContent>
                </DetailCard>
              </Grid>

              {selectedTicket.tcmpsts === "Done" && (
                <Grid item xs={12}>
                  <DetailCard>
                    <CardContent>
                      <Typography
                        variant="subtitle1"
                        gutterBottom
                        sx={{ fontWeight: "bold", color: "#0A2744" }}
                      >
                        <CheckCircleIcon
                          sx={{ verticalAlign: "middle", mr: 1 }}
                        />
                        Resolution Details
                      </Typography>
                      <Divider sx={{ mb: 2 }} />

                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                      >
                        <PersonIcon color="action" sx={{ mr: 1.5 }} />
                        <Typography variant="body2">
                          <strong>Resolved By:</strong> {selectedTicket.tdonby}
                        </Typography>
                      </Box>

                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                      >
                        <CalendarIcon color="action" sx={{ mr: 1.5 }} />
                        <Typography variant="body2">
                          <strong>Resolved Date:</strong>{" "}
                          {selectedTicket.tdondat}
                        </Typography>
                      </Box>

                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                      >
                        <TimeIcon color="action" sx={{ mr: 1.5 }} />
                        <Typography variant="body2">
                          <strong>Resolved Time:</strong>{" "}
                          {selectedTicket.tdontim}
                        </Typography>
                      </Box>

                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                      >
                        <DescriptionIcon color="action" sx={{ mr: 1.5 }} />
                        <Typography variant="body2">
                          <strong>Resolution Remarks:</strong>{" "}
                          {selectedTicket.tdonrem}
                        </Typography>
                      </Box>
                    </CardContent>
                  </DetailCard>
                </Grid>
              )}

              {selectedTicket.tcmpsts === "Confirm" && (
                <Grid item xs={12}>
                  <DetailCard>
                    <CardContent>
                      <Typography
                        variant="subtitle1"
                        gutterBottom
                        sx={{ fontWeight: "bold", color: "#0A2744" }}
                      >
                        <VerifiedIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                        Confirmation Details
                      </Typography>
                      <Divider sx={{ mb: 2 }} />

                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                      >
                        <PersonIcon color="action" sx={{ mr: 1.5 }} />
                        <Typography variant="body2">
                          <strong>Confirmed By:</strong> {selectedTicket.tcnfby}
                        </Typography>
                      </Box>

                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                      >
                        <CalendarIcon color="action" sx={{ mr: 1.5 }} />
                        <Typography variant="body2">
                          <strong>Confirmed Date:</strong>{" "}
                          {selectedTicket.tcnfdat}
                        </Typography>
                      </Box>

                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                      >
                        <TimeIcon color="action" sx={{ mr: 1.5 }} />
                        <Typography variant="body2">
                          <strong>Confirmed Time:</strong>{" "}
                          {selectedTicket.tcnftim || "N/A"}
                        </Typography>
                      </Box>

                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                      >
                        <DescriptionIcon color="action" sx={{ mr: 1.5 }} />
                        <Typography variant="body2">
                          <strong>Confirmation Remarks:</strong>{" "}
                          {selectedTicket.tcnfrem}
                        </Typography>
                      </Box>
                    </CardContent>
                  </DetailCard>
                </Grid>
              )}

              {(selectedTicket.tcmpsts === "Pending" ||
                selectedTicket.tcmpsts === "Done") && (
                <Grid item xs={12}>
                  <DetailCard>
                    <CardContent>
                      <Typography
                        variant="subtitle1"
                        gutterBottom
                        sx={{ fontWeight: "bold", color: "#0A2744" }}
                      >
                        {selectedTicket.tcmpsts === "Pending" ? (
                          <>
                            <CheckCircleIcon
                              sx={{ verticalAlign: "middle", mr: 1 }}
                            />
                            Resolution Remarks
                          </>
                        ) : (
                          <>
                            <VerifiedIcon
                              sx={{ verticalAlign: "middle", mr: 1 }}
                            />
                            Confirmation Remarks
                          </>
                        )}
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      <CommentTextarea
                        minRows={4}
                        placeholder={
                          selectedTicket.tcmpsts === "Pending"
                            ? "Enter detailed resolution remarks..."
                            : "Enter your confirmation remarks..."
                        }
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                      />
                    </CardContent>
                  </DetailCard>
                </Grid>
              )}
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button
                onClick={() => setSelectedTicket(null)}
                variant="outlined"
                sx={{ mr: 2, borderRadius: "8px" }}
              >
                Back to List
              </Button>
              {selectedTicket.tcmpsts === "Pending" && (
                <Button
                  onClick={handleMarkAsDone}
                  variant="contained"
                  color="primary"
                  startIcon={<CheckCircleIcon />}
                  sx={{ borderRadius: "8px" }}
                  disabled={loading || !remarks.trim()}
                >
                  {loading ? "Processing..." : "Mark as Resolved"}
                </Button>
              )}
              {selectedTicket.tcmpsts === "Done" && (
                <Button
                  onClick={handleConfirmTicket}
                  variant="contained"
                  color="secondary"
                  startIcon={<VerifiedIcon />}
                  sx={{ borderRadius: "8px" }}
                  disabled={loading || !remarks.trim()}
                >
                  {loading ? "Processing..." : "Confirm Resolution"}
                </Button>
              )}
            </Box>
          </Box>
        ) : (
          <>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="ticket status tabs"
              variant="fullWidth"
              sx={{
                "& .MuiTabs-indicator": {
                  backgroundColor: "#0A2744",
                  height: 3,
                },
                "& .MuiTab-root": {
                  color: "#0A2744",
                  fontWeight: "bold",
                  textTransform: "none",
                  fontSize: "0.9375rem",
                  "&.Mui-selected": { color: "#0A2744" },
                },
                position: "sticky",
                top: 0,
                zIndex: 1,
                backgroundColor: "white",
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
              }}
            >
              <Tab
                label={
                  <Badge
                    badgeContent={pendingTickets.length}
                    color="error"
                    sx={{ mr: 1 }}
                  >
                    Pending Tickets
                  </Badge>
                }
              />
              <Tab
                label={
                  <Badge
                    badgeContent={doneTickets.length}
                    color="warning"
                    sx={{ mr: 1 }}
                  >
                    Resolved Tickets
                  </Badge>
                }
              />
              <Tab
                label={
                  <Badge
                    badgeContent={confirmTickets.length}
                    color="success"
                    sx={{ mr: 1 }}
                  >
                    Confirmed Tickets
                  </Badge>
                }
              />
            </Tabs>

            <Box sx={{ p: 3 }}>
              <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                  borderRadius: "12px",
                  border: "1px solid #e0e0e0",
                  overflow: "hidden",
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#0A2744" }}>
                      <TableCell
                        sx={{
                          color: "white",
                          fontWeight: "600",
                          textAlign: "center",
                        }}
                      >
                        Ticket ID
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "white",
                          fontWeight: "600",
                          textAlign: "center",
                        }}
                      >
                        Date/Time
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "white",
                          fontWeight: "600",
                          textAlign: "center",
                        }}
                      >
                        Menu Type
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "white",
                          fontWeight: "600",
                          textAlign: "center",
                        }}
                      >
                        Description
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "white",
                          fontWeight: "600",
                          textAlign: "center",
                        }}
                      >
                        Status
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "white",
                          fontWeight: "600",
                          textAlign: "center",
                        }}
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tabValue === 0 &&
                      pendingTickets.map((ticket) => (
                        <StyledTableRow key={ticket.id}>
                          <TableCell
                            sx={{ fontWeight: "500", textAlign: "center" }}
                          >
                            {ticket.id}
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{ display: "flex", flexDirection: "column" }}
                            >
                              <Typography variant="body2">
                                {ticket.tcmpdat}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{ color: "text.secondary" }}
                              >
                                {ticket.tcmptim}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>{ticket.tmentyp}</TableCell>
                          <TableCell>
                            <Typography
                              variant="body2"
                              sx={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {ticket.tmendsc}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            <StatusChip
                              label={ticket.tcmpsts}
                              status={ticket.tcmpsts}
                              size="small"
                            />
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => setSelectedTicket(ticket)}
                              sx={{ borderRadius: "6px" }}
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </StyledTableRow>
                      ))}

                    {tabValue === 1 &&
                      doneTickets.map((ticket) => (
                        <StyledTableRow key={ticket.id}>
                          <TableCell
                            sx={{ fontWeight: "500", textAlign: "center" }}
                          >
                            {ticket.id}
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{ display: "flex", flexDirection: "column" }}
                            >
                              <Typography variant="body2">
                                {ticket.tcmpdat}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{ color: "text.secondary" }}
                              >
                                {ticket.tcmptim}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>{ticket.tmentyp}</TableCell>
                          <TableCell>
                            <Typography
                              variant="body2"
                              sx={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {ticket.tmendsc}
                            </Typography>
                          </TableCell>
                          <TableCell
                            sx={{ fontWeight: "500", textAlign: "center" }}
                          >
                            <StatusChip
                              label={ticket.tcmpsts}
                              status={ticket.tcmpsts}
                              size="small"
                            />
                          </TableCell>
                          <TableCell
                            sx={{ textAlign: "right", textAlign: "center" }}
                          >
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => setSelectedTicket(ticket)}
                              sx={{ borderRadius: "6px" }}
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </StyledTableRow>
                      ))}

                    {tabValue === 2 &&
                      confirmTickets.map((ticket) => (
                        <StyledTableRow key={ticket.id}>
                          <TableCell
                            sx={{ fontWeight: "500", textAlign: "center" }}
                          >
                            {ticket.id}
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{ display: "flex", flexDirection: "column" }}
                            >
                              <Typography variant="body2">
                                {ticket.tcmpdat}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{ color: "text.secondary" }}
                              >
                                {ticket.tcmptim}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>{ticket.tmentyp}</TableCell>
                          <TableCell>
                            <Typography
                              variant="body2"
                              sx={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {ticket.tmendsc}
                            </Typography>
                          </TableCell>
                          <TableCell
                            sx={{ fontWeight: "500", textAlign: "center" }}
                          >
                            <StatusChip
                              label={ticket.tcmpsts}
                              status={ticket.tcmpsts}
                              size="small"
                            />
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => setSelectedTicket(ticket)}
                              sx={{ borderRadius: "6px" }}
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </StyledTableRow>
                      ))}

                    {/* Empty rows for better table appearance */}
                    {tabValue === 0 &&
                      fillEmptyRows(pendingTickets).map((row, index) => (
                        <TableRow key={`empty-pending-${index}`}>
                          <TableCell
                            colSpan={6}
                            sx={{ height: "53px" }}
                          ></TableCell>
                        </TableRow>
                      ))}

                    {tabValue === 1 &&
                      fillEmptyRows(doneTickets).map((row, index) => (
                        <TableRow key={`empty-done-${index}`}>
                          <TableCell
                            colSpan={6}
                            sx={{ height: "53px" }}
                          ></TableCell>
                        </TableRow>
                      ))}

                    {tabValue === 2 &&
                      fillEmptyRows(confirmTickets).map((row, index) => (
                        <TableRow key={`empty-confirm-${index}`}>
                          <TableCell
                            colSpan={6}
                            sx={{ height: "53px" }}
                          ></TableCell>
                        </TableRow>
                      ))}

                    {/* No data messages */}
                    {tabValue === 0 && pendingTickets.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                          <Box sx={{ textAlign: "center" }}>
                            <TaskIcon
                              sx={{ fontSize: 48, color: "text.disabled" }}
                            />
                            <Typography variant="h6" color="text.secondary">
                              No Pending Tickets
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              All tickets are up to date
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}

                    {tabValue === 1 && doneTickets.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                          <Box sx={{ textAlign: "center" }}>
                            <CheckCircleIcon
                              sx={{ fontSize: 48, color: "text.disabled" }}
                            />
                            <Typography variant="h6" color="text.secondary">
                              No Resolved Tickets
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              No tickets have been marked as resolved yet
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}

                    {tabValue === 2 && confirmTickets.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                          <Box sx={{ textAlign: "center" }}>
                            <VerifiedIcon
                              sx={{ fontSize: 48, color: "text.disabled" }}
                            />
                            <Typography variant="h6" color="text.secondary">
                              No Confirmed Tickets
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              No tickets have been confirmed yet
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: "1px solid #e0e0e0" }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ borderRadius: "8px" }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ComplainOptions;
