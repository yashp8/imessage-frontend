export let catchAsync: any;
catchAsync = (fn: any) => (req: any, res: any, next: any) => {
    fn(req, res, next).catch(next);
};

// export const catchAsync = (fn: any) => (req: any, res: any, next: any) => {
//     fn(req, res, next).catch(next);
// };
