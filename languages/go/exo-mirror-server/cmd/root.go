package cmd

import "github.com/spf13/cobra"

var rootCmd = &cobra.Command{
	Use:   "exo-mirror-server",
	Short: "Smart Mirror Application",
	Run: func(cmd *cobra.Command, args []string) {
		cmd.Usage()
	},
}

func Execute() {}
