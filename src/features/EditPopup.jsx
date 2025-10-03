// {/* Edit dialog */}
// {/* Edit dialog */}
// <Dialog
//   open={isEditOpen}
//   maxWidth="md"
//   fullWidth
//   onClose={handleOnCancel}
// >
//   <DialogTitle sx={{ textAlign: "center" }}>Edit Ticket</DialogTitle>
//   <DialogContent dividers>
//     <Grid container spacing={2}>
//       {/* Left column */}
//       <Grid size={{ xs: 12, sm: 6 }}>
//         <TextField
//           margin="normal"
//           name="title"
//           label="Title"
//           fullWidth
//           variant="outlined"
//           value={formData?.title || ""}
//           onChange={(e) =>
//             setFormData({ ...formData, title: e.target.value })
//           }
//         />

//         <FormControl fullWidth margin="normal">
//           <InputLabel>Status</InputLabel>
//           <Select
//             name="status"
//             value={formData?.status || ""}
//             onChange={(e) =>
//               setFormData({ ...formData, status: e.target.value })
//             }
//           >
//             <MenuItem value="open">Open</MenuItem>
//             <MenuItem value="inprogress">In Progress</MenuItem>
//             <MenuItem value="closed">Closed</MenuItem>
//           </Select>
//         </FormControl>

//         <FormControl fullWidth margin="normal">
//           <InputLabel>Priority</InputLabel>
//           <Select
//             name="priority"
//             value={formData?.priority || ""}
//             onChange={(e) =>
//               setFormData({ ...formData, priority: e.target.value })
//             }
//           >
//             <MenuItem value="urgent">Urgent</MenuItem>
//             <MenuItem value="high">High</MenuItem>
//             <MenuItem value="medium">Medium</MenuItem>
//             <MenuItem value="low">Low</MenuItem>
//           </Select>
//         </FormControl>
//       </Grid>

//       {/* Right column */}
//       <Grid size={{ xs: 12, sm: 6 }}>
//         <TextField
//           margin="normal"
//           name="description"
//           label="Description"
//           fullWidth
//           multiline
//           rows={3}
//           variant="outlined"
//           value={formData?.description || ""}
//           onChange={(e) =>
//             setFormData({ ...formData, description: e.target.value })
//           }
//         />

//         <FormControl fullWidth margin="normal">
//           <InputLabel>Assignee</InputLabel>
//           <Select
//             name="assignee"
//             value={formData?.assignee || ""}
//             onChange={(e) =>
//               setFormData({ ...formData, assignee: e.target.value })
//             }
//           >
//             <MenuItem value="sai@abc.com">Sai</MenuItem>
//             <MenuItem value="sahithi@abc.com">Sahithi</MenuItem>
//             <MenuItem value="shiva@abc.com">Shiva</MenuItem>
//           </Select>
//         </FormControl>

//         <TextField
//           margin="normal"
//           name="reporter"
//           label="Reporter Email"
//           type="email"
//           fullWidth
//           variant="outlined"
//           value={formData?.reporter || ""}
//           onChange={(e) =>
//             setFormData({ ...formData, reporter: e.target.value })
//           }
//         />

//         <FormControl fullWidth margin="normal">
//           <InputLabel>Category</InputLabel>
//           <Select
//             name="category"
//             value={formData?.category || ""}
//             onChange={(e) =>
//               setFormData({ ...formData, category: e.target.value })
//             }
//           >
//             <MenuItem value="bug">Bug</MenuItem>
//             <MenuItem value="feature">Feature</MenuItem>
//             <MenuItem value="support">Support</MenuItem>
//           </Select>
//         </FormControl>
//       </Grid>
//     </Grid>
//   </DialogContent>

//   <DialogActions sx={{ justifyContent: "center", p: 2 }}>
//     <Button variant="contained" color="primary">
//       Update
//     </Button>
//     <Button variant="outlined" onClick={handleOnCancel}>
//       Cancel
//     </Button>
//   </DialogActions>
// </Dialog>
