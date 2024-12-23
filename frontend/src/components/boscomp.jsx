// import React, { useState } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
//   Collapse,
//   Typography,
//   Paper,
//   Box,
//   Button,
// } from '@mui/material';
// import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

// const Row = ({ caseItem }) => {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       <TableRow>
//         <TableCell>
//           <IconButton
//             aria-label="expand row"
//             size="small"
//             onClick={() => setOpen(!open)}
//           >
//             {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
//           </IconButton>
//         </TableCell>
//         <TableCell>{caseItem.case_number}</TableCell>
//         <TableCell>{caseItem.application_number}</TableCell>
//         <TableCell>{caseItem.lawyer}</TableCell>
//         <TableCell>{caseItem.court_name}</TableCell>
//         <TableCell>{caseItem.court_number}</TableCell>
//         <TableCell>{caseItem.start_date}</TableCell>
//         <TableCell>{caseItem.end_date}</TableCell>
//         <TableCell><Button>Düzenle</Button><Button>Sil</Button></TableCell>
//       </TableRow>
//       <TableRow>
//         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
//           <Collapse in={open} timeout="auto" unmountOnExit>
//             <Box margin={1}>
//               <Typography variant="body1">Dokumanlar:</Typography>
//               <Typography variant="body2">{caseItem.details}</Typography>
//             </Box>
//           </Collapse>
//         </TableCell>
//       </TableRow>
//     </>
//   );
// };

// const ListCase = () => {
//   const cases = [
//     {
//       case_number: '123',
//       application_number:'123',
//       court_number: '12ed',
//       lawyer: 'avukat',
//       court_name:'mahkeme'
//     },
    
//   ];

//   return (
//     <TableContainer component={Paper} sx={{marginLeft:"-10%"}} >
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell />
//             <TableCell>Dava Numarası </TableCell>
//             <TableCell>Başvuru Numarası</TableCell>
//             <TableCell>Avukat</TableCell>
//             <TableCell>Mahkeme Adı</TableCell>
//             <TableCell>Mahkeme Numarası</TableCell>
//             <TableCell>Başlangıç Tarihi</TableCell>
//             <TableCell>Bitiş Tarihi</TableCell>
//             <TableCell>İşlemler</TableCell>
//           </TableRow>
          
//         </TableHead>
//         <TableBody>
//           {cases.map((caseItem) => (
//             <Row key={caseItem.id} caseItem={caseItem}  />
            
//           ))}
          
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default ListCase;
