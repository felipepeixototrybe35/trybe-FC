import { Router } from 'express';
import TeamController from '../controller/teams.controller';

const teamsRouter = Router();

const teamsController = new TeamController();

teamsRouter.get('/', (req, res) => teamsController.getAll(req, res));
teamsRouter.get('/:id', (req, res) => teamsController.getById(req, res));

export default teamsRouter;
