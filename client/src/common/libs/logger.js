import logger from 'loglevel';

logger.setLevel(process.env.NODE_ENV === 'production' ? logger.levels.SILENT : logger.levels.TRACE);

export default logger;
