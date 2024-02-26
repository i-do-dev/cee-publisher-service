'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    // Drop the foreign key constraint if it exists
    const workflowConstraintExists = await queryInterface.sequelize.query(`
      SELECT constraint_name
      FROM information_schema.table_constraints
      WHERE table_name = 'cee_workflow'
      AND constraint_name = 'CeeWorkflow_ceeId_fkey'
    `);

    if (workflowConstraintExists[0].length > 0) {
      await queryInterface.removeConstraint('cee_workflow', 'CeeWorkflow_ceeId_fkey');
    }

    const manifestConstraintExists = await queryInterface.sequelize.query(`
      SELECT constraint_name
      FROM information_schema.table_constraints
      WHERE table_name = 'cee_manifest'
      AND constraint_name = 'fk_ceeId'
    `);

    if (manifestConstraintExists[0].length > 0) {
      await queryInterface.removeConstraint('cee_manifest', 'fk_ceeId');
    }

    // Rename the column
    await queryInterface.renameColumn('cee_workflow', 'cee_id', 'cee_master_id');
    await queryInterface.renameColumn('cee_manifest', 'cee_id', 'cee_master_id');

    // Add the foreign key constraint back
    await queryInterface.addConstraint('cee_workflow', {
      fields: ['cee_master_id'],
      type: 'foreign key',
      name: 'cee_workflow_cee_master_id_fkey',
      references: {
        table: 'cee_master',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('cee_manifest', {
      fields: ['cee_master_id'],
      type: 'foreign key',
      name: 'cee_manifest_cee_master_id_fkey',
      references: {
        table: 'cee_master',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    /* 
    // Drop the foreign key constraint
    await queryInterface.removeConstraint('CeeWorkflow', 'CeeWorkflow_ceeMasterId_fkey');
    await queryInterface.removeConstraint('CeeManifest', 'CeeManifest_ceeMasterId_fkey');

    // Rename the column back
    await queryInterface.renameColumn('CeeWorkflow', 'ceeMasterId', 'ceeId');
    await queryInterface.renameColumn('CeeManifest', 'ceeMasterId', 'ceeId');

    // Add the foreign key constraint back
    await queryInterface.addConstraint('CeeWorkflow', {
      fields: ['ceeId'],
      type: 'foreign key',
      name: 'CeeWorkflow_ceeId_fkey',
      references: {
        table: 'Cee',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('CeeManifest', {
      fields: ['ceeId'],
      type: 'foreign key',
      name: 'CeeManifest_ceeId_fkey',
      references: {
        table: 'Cee',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    */
  }
};